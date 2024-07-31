import { z } from "zod";


export const branchSchema = z.object({"id": z.number().optional(),"name": z.string().nullish()});