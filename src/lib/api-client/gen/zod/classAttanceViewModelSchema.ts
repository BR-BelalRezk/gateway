import { z } from "zod";


export const classAttanceViewModelSchema = z.object({"id": z.number().nullish(),"traineeId": z.number().nullish(),"classId": z.number().nullish(),"trainerNote": z.string().nullish()});