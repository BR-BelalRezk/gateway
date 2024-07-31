import { z } from "zod";


export const addTraineeLevelRequestSchema = z.object({"traineeId": z.number().optional(),"levelId": z.number().optional(),"notes": z.string().nullish()});