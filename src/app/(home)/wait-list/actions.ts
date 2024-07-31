"use server";

import { z } from "zod";
import { waitListTraineeSchema } from "@/app/(home)/wait-list/schema";
import { traineeSchema } from "@/app/(home)/pending-test/schema";

// Simulate a database read for tasks.
export async function getWaitingListTrainees({
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
  const res = await fetch(
    `${process.env.API_URL}/api/waitinglist?page=${page}${keyword ? `&keyword=${keyword}` : ""
    }${branchesIds ? `&branches=${branchesIds.join(",")}` : ""}${attendTypes ? `&attendTypes=${attendTypes.join(",")}` : ""
    }${levels ? `&levels=${levels.join(",")}` : ""}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    ////console.log(await res.text());
  }

  const { trainees, paginationMetadata } = await res.json();

  const traineesFormatted = z.array(waitListTraineeSchema).parse(trainees);

  return {
    total: paginationMetadata.totalCount,
    trainees: traineesFormatted,
    hasNextPage:
      paginationMetadata.currentPage !== paginationMetadata.totalPages,
  };
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
