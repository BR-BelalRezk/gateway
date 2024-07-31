import { z } from "zod";


export const createTraineeCountResponseSchema = z.object({"myTraineeCount": z.number(),"usersWithHighestCountLogs": z.number(),"usersWithHighestCountName": z.string().min(1)});