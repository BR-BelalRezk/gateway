import { z } from "zod";


export const classViewModelSchema = z.object({"name": z.string().nullish(),"typeId": z.number().nullish(),"batchId": z.number().nullish(),"roomId": z.number().nullish(),"timeSlotId": z.number().nullish(),"dayNumber": z.number().nullish(),"trainerId": z.number().nullish(),"levelId": z.number().nullish()});