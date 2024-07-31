"use server";

import { z } from "zod";
import { getCurrentUser } from "@/lib/session";
import {
  Class,
  TraineeInAttendance,
  batchWithClassCountSchema,
  classSchema,
  traineeInAttendanceSchema,
} from "@/app/(home)/batches/schema";
import { FilterPossibleValues } from "@/types/columns";
import { getBranches } from "@/app/(home)/users/actions";

// Simulate a database read for tasks.
export async function getBatches({
  keyword,
  branchId,
}: {
  keyword?: string;
  branchId?: string;
}) {
  const myUrlWithParams = new URL(`${process.env.API_URL}/api/Batches/Batch`);

  if (keyword) myUrlWithParams.searchParams.append("keyword", keyword);
  if (branchId) myUrlWithParams.searchParams.append("branchId", branchId);

  const res = await fetch(myUrlWithParams.href, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    ////console.log(await res.text());
  }

  const batchesWithClassNumber = await res.json();

  const batches = z
    .array(batchWithClassCountSchema)
    .parse(batchesWithClassNumber);

  return {
    batches: batches,
  };
}

interface CreateBatchInput {
  name: string;
  startDate?: string;
  endDate?: string;
  branchId: string;
}

export async function createBatch(
  body: CreateBatchInput
): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Batches/Batch`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });

  const rolesJson = await res.text();

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

type UpdateBatchInput = CreateBatchInput & {
  id: string;
};


// addTrainerNotes

export async function addTrainerNotes({
  classId,
  traineeId,
  note,
  isAdminNotes
}: {
  classId: string;
  traineeId: string;
  note: string;
  isAdminNotes: boolean;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();
  //console.log("addTrainerNotes");
  //console.log(classId);
  //console.log(traineeId);
  //console.log(note);
  //console.log(user);
  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(
    `${process.env.API_URL}/api/Attendance/AddTrainerNotesTotrainees?classId=${classId}&traineeId=${traineeId}&note=${note}&isAdminNotes=${isAdminNotes}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`,
      },
    }
  );

  const rolesJson = await res.text();
  //console.log("addTrainerNotes");
  //console.log(rolesJson);
  //console.log(res);
  //console.log(res.ok);
  if (!res.ok) {
    if (res.status == 403) {
      return { ok: false, error: "unauthorized" };
    } else {
      return { ok: false, error: "internal-server-error" };
    }
  }

  return { ok: true };
}
export async function addTrainerFinalNotes({
  classId,
  traineeId,
  note,
}: {
  classId: string;
  traineeId: string;
  note: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();
  //console.log("addTrainerNotes");
  //console.log(classId);
  //console.log(traineeId);
  //console.log(note);
  //console.log(user);
  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(
    `${process.env.API_URL}/api/Attendance/AddTrainerFinalNotes?classId=${classId}&traineeId=${traineeId}&note=${note}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`,
      },
    }
  );

  const rolesJson = await res.text();
  //console.log("addTrainerNotes");
  //console.log(rolesJson);
  //console.log(res);
  //console.log(res.ok);
  if (!res.ok) {
    if (res.status == 403) {
      return { ok: false, error: "unauthorized" };
    } else {
      return { ok: false, error: "internal-server-error" };
    }
  }

  return { ok: true };
}

// AddSessionNotes for the api
//         //POST: api/Attendance/AddSessionNotes
//        public async Task<IActionResult> AddSessionNotes(int classId, int traineeId, int dayNumber, string note = "")

export async function addSessionNotes({
  classId,
  traineeId,
  dayNumber,
  note,
}: {
  classId: string;
  traineeId: string;
  dayNumber: string;
  note: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();
  //console.log("AddSessionNotes");
  //console.log(classId);
  //console.log(traineeId);
  //console.log(dayNumber);
  //console.log(note);
  //console.log(user);
  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(
    `${process.env.API_URL}/api/Attendance/AddSessionNotes?classId=${classId}&traineeId=${traineeId}&dayNumber=${dayNumber}&note=${note}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`,
      },
    }
  );

  const rolesJson = await res.text();
  //console.log("AddSessionNotes");
  //console.log(rolesJson);
  //console.log(res);
  //console.log(res.ok);
  if (!res.ok) {
    if (res.status == 403) {
      return { ok: false, error: "unauthorized" };
    } else {
      return { ok: false, error: "internal-server-error" };
    }
  }

  return { ok: true };
}

export async function updateBatch(
  body: UpdateBatchInput
): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Batches/${body.id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${user.token}`,
    },
  });

  const rolesJson = await res.text();

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

export async function deleteBatch({
  id,
}: {
  id: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Batches/${id}`, {
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

export async function endBatch({
  id,
}: {
  id: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Batches/EndBatch/${id}`, {
    method: "POST",
    headers: {
      // Authorization: `Bearer ${user.token}`,
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

export async function getBatchById(id: string) {
  const res = await fetch(`${process.env.API_URL}/api/Batches/${id}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    ////console.log(await res.text());
  }

  const batchesWithClassNumber = await res.json();

  const batch = batchWithClassCountSchema.parse(batchesWithClassNumber);

  return batch;
}

export async function getBatchClassesById({
  batchId,
  keyword,
  types,
  levels,
  trainers,
}: {
  batchId: string;
  keyword?: string;
  types?: string;
  trainers?: string;
  levels?: string;
}) {
  const myUrlWithParams = new URL(
    `${process.env.API_URL}/api/Classes/ClassesByBatchId/${batchId}`
  );

  if (keyword) myUrlWithParams.searchParams.append("keyword", keyword);
  if (types) myUrlWithParams.searchParams.append("types", types);
  if (levels) myUrlWithParams.searchParams.append("levels", levels);
  if (trainers) myUrlWithParams.searchParams.append("trainers", trainers);

  ////console.log("myUrlWithParams", myUrlWithParams.href);

  const res = await fetch(myUrlWithParams.href, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    ////console.log(await res.text());
  }

  const classes = await res.json();

  const batch = z.array(classSchema).parse(classes);

  return batch;
}

interface CreateClassInput {
  name: string;
  typeId: string;
  batchId: string;
  roomId: string;
  timeSlotId: string;
  dayNumber: string;
  trainerId: string;
  levelId: string;
}

export async function createClass(
  body: CreateClassInput
): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Classes/Classes`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${user.token}`,
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

type UpdateClassInput = CreateClassInput & {
  id: string;
};

export async function updateClass(
  body: UpdateClassInput
): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(
    `${process.env.API_URL}/api/Classes/Classes/${body.id}`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`,
      },
    }
  );

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

export async function deleteClass({
  id,
}: {
  id: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Classes/Classes/${id}`, {
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

export async function getClassById(id: string) {
  const res = await fetch(`${process.env.API_URL}/api/Classes/Classes/${id}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    ////console.log(await res.text());
  }
  
  const classes = await res.json();
  console.log(JSON.stringify(classes))

  const batch = classSchema.parse(classes);
  //console.log(batch.classTrainees);

  return batch;
}

export async function getBranchClassesById(id: string) {
  const user = await getCurrentUser();

  const res = await fetch(
    `${process.env.API_URL}/api/Classes/ClassesByBranchId/${id}`,
    {
      next: { revalidate: 0 },
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );

  if (!res.ok) {
    ////console.log(await res.text());
    return;
  }

  const classes = await res.json();

  ////console.log("HGHGHG", JSON.stringify(classes, null, 2));
  // //console.log("getting");
  const batch = z.array(classSchema).parse(classes);
  // //console.log("got", batch);

  return batch;
}

export async function getActiveClassesForAllBranches() {
  const branches = await getBranches();

  const classesByBatch = await Promise.all(
    branches.map((branch) => getBranchClassesById(branch.value))
  );

  const object: { [key: string]: FilterPossibleValues } = {};

  for (let index in branches) {
    if (classesByBatch[index]) {
      object[branches[index].value] = classesByBatch[index]!.map(
        (classData) => ({
          value: classData.id.toString(),
          label: classData.name,
        })
      );
    }
  }

  return object;
}

export async function getClassAttendanceById(
  id: string
): Promise<TraineeInAttendance[]> {
  const res = await fetch(
    `${process.env.API_URL}/api/Attendance/getAttendanceByClassId?classId=${id}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    ////console.log(await res.text());
  }

  const classes = await res.json();

  //console.log("SSSSS", classes);

  const batch = z.array(traineeInAttendanceSchema).parse(classes);

  return batch;
}

export interface ToggleAttendanceInput {
  traineeId: string;
  dayNumber: string;
  classId: string;
  isNew: boolean;
}

export async function toggleAttendance(
  body: ToggleAttendanceInput
): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Attendance`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${user.token}`,
    },
  });

  const rolesJson = await res.text();

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
