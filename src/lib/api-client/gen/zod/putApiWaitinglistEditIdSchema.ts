import { z } from "zod";


export const putApiWaitinglistEditIdMutationRequestSchema = z.any();
export const putApiWaitinglistEditIdMutationResponseSchema = z.any();
export const putApiWaitinglistEditIdPathParamsSchema = z.object({"id": z.number()});