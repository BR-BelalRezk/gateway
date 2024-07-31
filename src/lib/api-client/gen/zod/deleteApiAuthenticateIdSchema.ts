import { z } from "zod";


export const deleteApiAuthenticateIdMutationResponseSchema = z.any();
export const deleteApiAuthenticateIdPathParamsSchema = z.object({"id": z.string()});