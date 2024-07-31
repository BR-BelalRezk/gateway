import { z } from "zod";


export const putApiAuthenticateIdMutationRequestSchema = z.object({"UserName": z.string().optional(),"Email": z.string().optional(),"Role": z.string().optional(),"BranchId": z.number().optional(),"file": z.string().optional()});
export const putApiAuthenticateIdMutationResponseSchema = z.any();
export const putApiAuthenticateIdPathParamsSchema = z.object({"id": z.string()});