import { z } from "zod";


export const postApiBatchesEndbatchIdMutationResponseSchema = z.any();
export const postApiBatchesEndbatchIdPathParamsSchema = z.object({"id": z.number()});