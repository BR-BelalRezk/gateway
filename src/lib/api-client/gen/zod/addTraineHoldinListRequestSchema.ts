import { z } from "zod";


export const addTraineHoldinListRequestSchema = z.object({"traineeId": z.number().optional(),"notes": z.string().nullish()});