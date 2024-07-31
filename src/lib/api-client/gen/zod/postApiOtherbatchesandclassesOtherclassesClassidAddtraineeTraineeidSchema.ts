import { z } from "zod";


export const postApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeidMutationResponseSchema = z.any();
export const postApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeidPathParamsSchema = z.object({"classId": z.number(),"traineeId": z.number()});
export const postApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeidQueryParamsSchema = z.object({"levelId": z.number().optional()});