"use server";

import { z } from "zod";
import { holdListTraineeSchema } from "@/app/(home)/hold-list/schema";
import { traineeSchema } from "@/app/(home)/pending-test/schema";
import { getCurrentUser } from "@/lib/session";

// Simulate a database read for tasks.
export async function getHoldingListTrainees({
  keyword,
  branchesIds,
  attendTypes,
  levels,
  page,
}: {
  keyword?: string;
  branchesIds?: string[];
  attendTypes?: string[];
  levels?: string[];
  page: number;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }
  const res = await fetch(
    `${process.env.API_URL}/api/HoldingList?page=${page}${keyword ? `&keyword=${keyword}` : ""
    }${branchesIds ? `&branches=${branchesIds.join(",")}` : ""}${attendTypes ? `&attendTypes=${attendTypes.join(",")}` : ""
    }${levels ? `&levels=${levels.join(",")}` : ""}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    ////console.log(await res.text());
  }
  // ////console.log("await res.text()")
  let x = await res.json();
  // //console.log("x", x.trainees);
  const { trainees, paginationMetadata } = x;

  const traineesFormatted = z.array(holdListTraineeSchema).parse(trainees);

  return {
    total: paginationMetadata.totalCount,
    trainees: traineesFormatted,
    hasNextPage:
      paginationMetadata.currentPage !== paginationMetadata.totalPages,
  };
}

export async function MoveToWaitingList({traineeIds}:{traineeIds:string[]}){
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }
  //console.log("IAM MOVING TO WAITING LIST");
  //console.log(traineeIds);
  let body = JSON.stringify(
    traineeIds
  );
  //console.log(body)
  const res = await fetch(`${process.env.API_URL}/api/waitinglist/AddToWaitingList`, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
       Authorization: `Bearer ${user.token}`,
    },
  });

  if(!res.ok){
    //console.log("COULD NOT MOVE TO WAITING LIST");
    return {ok:false}
  }
  //console.log(await res.text());
  //console.log("MOVED TO WAITING LIST");

  // const responseData = await res.json();
  return { ok: true };

  
}
export async function MoveToHoldingList({traineeIds,notes}:{traineeIds:string[],notes:string}){
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }
  //console.log("IAM MOVING TO HOLDING LIST");
  //console.log(traineeIds);
  let body = JSON.stringify({
    TraineeIds: traineeIds,
    notes: notes
  });
  //console.log("body",body);
  //console.log("body",body);
  const res = await fetch(`${process.env.API_URL}/api/HoldingList/AddTrineeToHoldingList`, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${user.token}`,
    },
  });

  if(!res.ok){
    //console.log("COULD NOT MOVE TO HOLDING LIST");
    return {ok:false, error:"COULD NOT MOVE TO HOLDING LIST"};
  }

  // const responseData = await res.json();
  return { ok: true };

  
}

export async function SearchTraineeByMobileNumber({
  mobileNumber,
}: {
  mobileNumber?: string;
}) {
  const res = await fetch(
    `${process.env.API_URL}/api/Trainee/SearchTraineeByPhone?phoneNumber=${mobileNumber}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    ////console.log(await res.text());
  }

  const responseData = await res.json();

  ////console.log("responseDataresponseData", responseData);
  

  return responseData;
}
