"use server";

import { getCurrentUser } from "@/lib/session";

// Simulate a database read for tasks.
export async function updatePassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(
    `${process.env.API_URL}/api/Authenticate/api/change-password`,
    {
      method: "POST",
      body: JSON.stringify({
        id: user.id,
        oldPassword: currentPassword,
        newPassword: newPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`,
      },
    }
  );

  const rolesJson = await res.text();

  if (!res.ok) {
    if (res.status == 403) {
      return { ok: false, error: "unauthorized" };
    }
    if (res.status == 400 && rolesJson == "Old password is incorrect.") {
      return { ok: false, error: "old-password-is-incorrect" };
    } else {
      return { ok: false, error: "internal-server-error" };
    }
  }

  return { ok: true };
}
