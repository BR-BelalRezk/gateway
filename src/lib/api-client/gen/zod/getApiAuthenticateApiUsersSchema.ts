import { z } from "zod";


export const getApiAuthenticateApiUsersQueryParamsSchema = z.object({"keyword": z.string().default('').optional(),"branches": z.string().default('').optional(),"roles": z.string().default('').optional(),"page": z.number().optional(),"pageSize": z.number().optional()});
export const getApiAuthenticateApiUsersQueryResponseSchema = z.any();