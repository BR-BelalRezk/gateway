"use server";

import { z } from "zod";
import { roleSchema, userSchema } from "@/app/(home)/users/schema";
import { FilterPossibleValues } from "@/types/columns";
import { getCurrentUser } from "@/lib/session";
import {
  Room,
  branchSchema,
  classTypeSchema,
  roomSchema,
} from "@/app/(home)/batches/schema";

// Simulate a database read for tasks.
export async function getUsers({
  keyword,
  branchesIds,
  page,
}: {
  keyword?: string;
  branchesIds?: string[];
  page: number;
}) {
  const res = await fetch(
    `${process.env.API_URL}/api/Authenticate/api/users?page=${page}${keyword ? `&keyword=${keyword}` : ""
    }${branchesIds ? `&branches=${branchesIds.join(",")}` : ""}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    ////console.log(await res.text());
  }

  const { usersWithRoles, paginationMetadata } = await res.json();

  const usersData = usersWithRoles.map((user: any) => ({
    id: user.user.id,
    name: user.user.userName,
    image: user.user.image,
    isActivated: user.user.isActivated,
    email: user.user.email,
    role: {
      value: user.roles[0].id,
      label: user.roles[0].name,
    },
    branch: user.user.branch
      ? {
        value: user.user.branch.id,
        label: user.user.branch.name,
      }
      : null,
  }));

  const users = z.array(userSchema).parse(usersData);

  return {
    total: paginationMetadata.totalCount,
    users: users,
    hasNextPage:
      paginationMetadata.currentPage !== paginationMetadata.totalPages,
  };
}

// Simulate a database read for tasks.
export async function getBranches(): Promise<FilterPossibleValues> {
  const res = await fetch(`${process.env.API_URL}/api/Entities/branches`, {
    cache: "no-store",
  });

  const branchesJson = await res.json();

  const branchesData = branchesJson.map((branch: any) => ({
    id: branch.id,
    name: branch.name,
  }));

  const branches = z.array(branchSchema).parse(branchesData);

  return branches.map((b) => ({
    value: b.id.toString(),
    label: b.name,
  }));
}

// Simulate a database read for tasks.
export async function getRoles(): Promise<FilterPossibleValues> {
  const res = await fetch(`${process.env.API_URL}/api/Authenticate/roles`, {
    cache: "no-store",
  });

  const rolesJson = await res.json();

  const rolesData = rolesJson.map((role: any) => ({
    id: role.id,
    name: role.name,
  }));

  const roles = z.array(roleSchema).parse(rolesData);

  return roles.map((b) => ({
    value: b.id,
    label: b.name,
  }));
}

export async function createUser({
  username,
  email,
  role,
  branch,
  password
}: {
  username: string;
  email: string;
  role: string;
  branch: string;
  password: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Authenticate/register`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
      role: role,
      branchId: branch,
    }),
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${user.token}`,
    },
  });

  if (!res.ok) {
    if (res.status == 403) {
      return { ok: false, error: "unauthorized" };
    }

    const jsonResponse = await res.json()
    if (jsonResponse.message == "User already exists!") {
      return { ok: false, error: "user_already_exists" };
    }

    else {
      return { ok: false, error: "internal-server-error" };
    }
  }

  return { ok: true };
}

export async function updateUser({
  id,
  username,
  email,
  role,
  branch,
}: {
  id: string;
  username: string;
  email: string;
  role: string;
  branch: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  let formData = new FormData();
  formData.append("UserName", username);
  formData.append("Email", email);
  formData.append("RoleName", role);
  formData.append("BranchId", branch);

  const res = await fetch(`${process.env.API_URL}/api/Authenticate/${id}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!res.ok) {
    if (res.status == 403) {
      return { ok: false, error: "unauthorized" };
    }
    // if (res.status == 400 && rolesJson == "Old password is incorrect.") {
    //   return { ok: false, error: "old-password-is-incorrect" };
    // }
    else {
      return { ok: false, error: "internal-server-error" };
    }
  }

  return { ok: true };
}

export async function deleteUser({
  id,
}: {
  id: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Authenticate/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!res.ok) {
    if (res.status == 403) {
      return { ok: false, error: "unauthorized" };
    }
    // if (res.status == 400 && rolesJson == "Old password is incorrect.") {
    //   return { ok: false, error: "old-password-is-incorrect" };
    // }
    else {
      return { ok: false, error: "internal-server-error" };
    }
  }

  return { ok: true };
}

// Simulate a database read for tasks.
export async function getTypes(): Promise<FilterPossibleValues> {
  const res = await fetch(`${process.env.API_URL}/api/Entities/type`, {
    cache: "no-store",
  });

  const typesJson = await res.json();

  const types = z.array(classTypeSchema).parse(typesJson);

  return types.map((b) => ({
    value: b.id.toString(),
    label: b.name,
  }));
}

// Simulate a database read for tasks.
export async function getRooms(): Promise<Room[]> {
  const res = await fetch(`${process.env.API_URL}/api/Entities/rooms`, {
    cache: "no-store",
  });

  const roomsJson = await res.json();

  const rooms = z.array(roomSchema).parse(roomsJson);

  return rooms;
}
