import { z } from "zod";


export const getApiTraineeWaitingfortestQueryParamsSchema = z.object({"keyword": z.string().default('').optional(),"branches": z.string().default('').optional(),"attendTypes": z.string().default('').optional(),"assignedTrainers": z.string().default('').optional(),"assignedTrainersUsersIds": z.string().default('').optional(),"traineeId": z.number().optional(),"page": z.number().optional(),"pageSize": z.number().optional()});
export const getApiTraineeWaitingfortestQueryResponseSchema = z.any();