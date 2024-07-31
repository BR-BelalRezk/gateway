"use server";

import { getCurrentUser } from "@/lib/session";

// Simulate a database read for tasks.
export async function updateProfile({
  username,
  email,
}: {
  username: string;
  email: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  let formData = new FormData();
  formData.append("UserName", username);
  formData.append("Email", email);

  const res = await fetch(`${process.env.API_URL}/api/Authenticate/${user.id}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  // const rolesJson = await res.json();
  // ////console.log("rolesJson", rolesJson);

  if (!res.ok) {
    if (res.status == 403) {
      return { ok: false, error: "unauthorized" };
    }
    else {
      return { ok: false, error: "internal-server-error" };
    }
  }

  return { ok: true };
}
