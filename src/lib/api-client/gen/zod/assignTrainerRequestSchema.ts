import { z } from "zod";


export const assignTrainerRequestSchema = z.object({"traineeId": z.number().optional(),"trainerId": z.number().optional(),"date": z.string().datetime().optional()});