import { z } from "zod";


export const attendanceViewModelSchema = z.object({"id": z.number().optional(),"traineeId": z.number().optional(),"dayNumber": z.number().optional(),"classId": z.number().optional(),"isNew": z.boolean().optional(),"noteFromSession": z.string().nullish(),"noteFromTrainer": z.string().nullish()});