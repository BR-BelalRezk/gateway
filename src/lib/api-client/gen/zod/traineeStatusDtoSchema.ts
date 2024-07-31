import { z } from "zod";


export const traineeStatusDtoSchema = z.object({"fullName": z.string().nullish(),"phone": z.string().nullish(),"status": z.string().nullish(),"statusId": z.number().optional(),"traineeId": z.number().optional()});