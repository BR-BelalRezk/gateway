"use server";

import { z } from "zod";
import { FilterPossibleValues } from "@/types/columns";
import { getCurrentUser } from "@/lib/session";
import {
  countrySchema,
  citySchema,
  timeSlotSchema,
  trainerSchema,
  traineeSchema,
  levelSchema,
  usersOptionSchema,
} from "@/app/(home)/pending-test/schema";

// Simulate a database read for tasks.
export async function getCountries(): Promise<FilterPossibleValues> {
  const res = await fetch(`${process.env.API_URL}/api/Entities/country`, {
    cache: "no-store",
  });

  const countriesJson = await res.json();

  const countriesData = countriesJson.map((role: any) => ({
    id: role.id,
    name: role.name,
  }));

  const countries = z.array(countrySchema).parse(countriesData);

  return countries.map((b) => ({
    value: b.id.toString(),
    label: b.name,
  }));
}

// Simulate a database read for tasks.
export async function getCities(
  countryId: string
): Promise<FilterPossibleValues> {
  const res = await fetch(
    `${process.env.API_URL}/api/Entities/city?CountryId=${countryId}`,
    {
      cache: "no-store",
    }
  );

  const citiesJson = await res.json();

  const citiesData = citiesJson.map((role: any) => ({
    id: role.id,
    name: role.name,
  }));

  const cities = z.array(citySchema).parse(citiesData);

  return cities.map((b) => ({
    value: b.id.toString(),
    label: b.name,
  }));
}

// Simulate a database read for tasks.
export async function getTimeSlots(): Promise<FilterPossibleValues> {
  const res = await fetch(`${process.env.API_URL}/api/Entities/timeslots`, {
    cache: "no-store",
  });

  const timeSlotsJson = await res.json();

  const timeSlotsData = timeSlotsJson.map((timeslot: any) => ({
    id: timeslot.id,
    type:timeslot.type,
    name: `${timeslot.day1} ${timeslot.startTime
      .split(":")
      .slice(0, 2)
      .join(":")}`,
  }));

  const timeSlots = z.array(timeSlotSchema).parse(timeSlotsData);

  return timeSlots.map((timeslot) => ({
    value: timeslot.id.toString(),
    label: timeslot.name,
    type:timeslot.type
  }));
}

// Simulate a database read for tasks.
export async function getTrainers(): Promise<FilterPossibleValues> {
  const res = await fetch(`${process.env.API_URL}/api/Trainee/trainers`, {
    cache: "no-store",
  });

  const trainersJson = await res.json();

  const trainersData = trainersJson.map((trainer: any) => ({
    id: trainer.id.toString(),
    name: trainer.aspNetUser.userName,
  }));
  //console.log("YOYOYOYOYOY");
  //console.log(trainersData);

  const trainers = z.array(trainerSchema).parse(trainersData);
  //console.log("NONONONONON");

  return trainers.map((trainer) => ({
    value: trainer.id,
    label: trainer.name,
  }));
}

// Simulate a database read for tasks.
export async function getUsersOptions(): Promise<FilterPossibleValues> {
  const res = await fetch(
    `${process.env.API_URL}/api/Authenticate/api/users?page=1&pageSize=999999999`,
    {
      cache: "no-store",
    }
  );

  const usersJson = await res.json();

  const usersData = usersJson.usersWithRoles.map((user: any) => ({
    id: user.user.id,
    name: user.user.userName,
  }));

  const users = z.array(usersOptionSchema).parse(usersData);

  return users.map((trainer) => ({
    value: trainer.id.toString(),
    label: trainer.name,
  }));
}

// Simulate a database read for tasks.
export async function getLevels(): Promise<FilterPossibleValues> {
  const res = await fetch(`${process.env.API_URL}/api/Entities/levels`, {
    cache: "no-store",
  });

  const levelsJson = await res.json();

  const levelsData = levelsJson.map((level: any) => ({
    id: level.id,
    name: level.name,
  }));

  const levels = z.array(levelSchema).parse(levelsData);

  return levels.map((level) => ({
    value: level.id.toString(),
    label: level.name,
  }));
}

// Simulate a database read for tasks.
export async function getPendingTestTrainees({
  keyword,
  branchesIds,
  attendTypes,
  assignedTrainers,
  page,
}: {
  keyword?: string;
  branchesIds?: string[];
  attendTypes?: string[];
  assignedTrainers?: string[];
  page: number;
}) {
  const res = await fetch(
    `${process.env.API_URL}/api/Trainee/WaitingForTest?page=${page}${
      keyword ? `&keyword=${keyword}` : ""
    }${branchesIds ? `&branches=${branchesIds.join(",")}` : ""}${
      attendTypes ? `&attendTypes=${attendTypes.join(",")}` : ""
    }${
      assignedTrainers ? `&assignedTrainers=${assignedTrainers.join(",")}` : ""
    }`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    ////console.log(await res.text());
  }

  const { trainees, paginationMetadata } = await res.json();
  ////console.log(trainees)
  const traineesFormatted = z.array(traineeSchema).parse(trainees);

  return {
    total: paginationMetadata.totalCount,
    trainees: traineesFormatted,
    hasNextPage:
      paginationMetadata.currentPage !== paginationMetadata.totalPages,
  };
}

interface CreateTraineeInput {
  fullName: string;
  birthdate?: string;
  mobile: string;
  email?: string;
  typeOfGender: string;
  preferredDayForTest?: string;
  startTimeForTest?: string;
  branchId: string;
  attendType?: string;
  notes?: string;
  education?: string;
  job?: string;
  preferredSlotId?: string;
  secondPreferredSlotId?: string;
  countryId?: string;
  cityId?: string;
  levelId?: string;
  paidType?: string;
  paidValue?: string;
  remainingValue?: string;
  followUpUserId?: string[];
}

export async function createTrainee(
  body: CreateTraineeInput
): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Trainee`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!res.ok) {
    ////console.log(await res.text());

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

type UpdateTraineeInput = CreateTraineeInput & {
  id: string;
};

export async function updateTrainee(
  body: UpdateTraineeInput
): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  ////console.log("body", body);

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Trainee/${body.id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${user.token}`,
    },
  });

  if (!res.ok) {
    ////console.log(await res.text());

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

export async function deleteTrainee({
  id,
}: {
  id: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Trainee/${id}`, {
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

export async function deleteTrainees({
  id,
}: {
  id: string[];
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }
  await id.forEach(async (id) => {
    //console.log(id);

    const res = await fetch(`${process.env.API_URL}/api/Trainee/${id}`, {
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
  });

  return { ok: true };
}
export async function assignLevel({
  traineeId,
  levelId,
  notes,
}: {
  traineeId: string;
  levelId: string;
  notes: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(`${process.env.API_URL}/api/Trainee/AddTrineeLevel`, {
    method: "POST",
    body: JSON.stringify({
      traineeId: traineeId,
      levelId: levelId,
      notes: notes,
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
    // if (res.status == 400 && rolesJson == "Old password is incorrect.") {
    //   return { ok: false, error: "old-password-is-incorrect" };
    // }
    else {
      return { ok: false, error: "internal-server-error" };
    }
  }

  return { ok: true };
}

export async function assignTrainer({
  traineeIds,
  trainerId,
  date,
}: {
  traineeIds: string[];
  trainerId: string;
  date: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  let body = JSON.stringify({
    TraineeIds: traineeIds,
    TrainerId: trainerId,
    date: date,
  });
  //console.log(body);
  const res = await fetch(`${process.env.API_URL}/api/Trainee/assign-trainer`, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${user.token}`,
    },
  });

  if (!res.ok) {
    //console.log("RES IS NOT OK");
    //console.log(await res.text());
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

export async function assignClass({
  traineeIds,
  classId,
}: {
  traineeIds: string[];
  classId: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  // const user = await getCurrentUser();

  // if (!user) {
  //   return { ok: false, error: "unauthenticated" };
  // }

  //console.log("#######!!!!!!!!!!!!#")
  //console.log(traineeIds)

  //map traineeIds to int
  let traineeIdsInt = traineeIds.map((traineeId) => parseInt(traineeId))
    let body = JSON.stringify(
      traineeIds
    )

    //console.log(body)
    const res = await fetch(
      `${process.env.API_URL}/api/Classes/Classes/${classId}/AddTrainees`,
      {
        method: "POST",
        body: body,
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

export async function switchClass({
  traineeIds,
  classId,
}: {
  traineeIds: string[];
  classId: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  //console.log("HEY");
  //console.log(traineeIds.map((traineeId) => parseInt(traineeId)));
  let body = JSON.stringify(traineeIds.map((traineeId) => parseInt(traineeId)));
  //console.log(body);
  const res = await fetch(
    `${process.env.API_URL}/api/Classes/Classes/${classId}/SwitchTrainees`,
    {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`,
      },
    }
  );

  if (!res.ok) {
    //console.log("Failed");
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

export async function removeFromClass({
  traineeIds,
  classId,
}: {
  traineeIds: string[];
  classId: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  //console.log("HEY");
  //console.log(traineeIds.map((traineeId) => parseInt(traineeId)));
  let body = JSON.stringify(traineeIds.map((traineeId) => parseInt(traineeId)));
  //console.log(body);
  const res = await fetch(
    `${process.env.API_URL}/api/Classes/Classes/${classId}/RemoveTrainees`,
    {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.token}`,
      },
    }
  );

  if (!res.ok) {
    //console.log("Failed");
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

export async function addToClassAttendance({
  traineeId,
  classId,
}: {
  traineeId: string;
  classId: string;
}): Promise<{ ok: false; error: string } | { ok: true }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  const res = await fetch(
    `${process.env.API_URL}/api/Attendance/AddTraineeToClassAttendance`,
    {
      method: "POST",
      body: JSON.stringify({
        traineeId: traineeId,
        classId: classId,
      }),
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
