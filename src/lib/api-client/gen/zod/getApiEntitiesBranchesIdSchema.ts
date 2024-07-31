import { z } from "zod";


export const getApiEntitiesBranchesIdPathParamsSchema = z.object({"id": z.number()});
export const getApiEntitiesBranchesIdQueryResponseSchema = z.any();