import { z } from "zod";


export const postApiEntitiesTablenameMutationResponseSchema = z.any();
export const postApiEntitiesTablenamePathParamsSchema = z.object({"tableName": z.string()});