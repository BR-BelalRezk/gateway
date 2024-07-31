import { z } from "zod";


export const deleteApiWaitinglistIdMutationResponseSchema = z.any();
export const deleteApiWaitinglistIdPathParamsSchema = z.object({"id": z.number()});