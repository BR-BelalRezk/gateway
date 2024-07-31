import { z } from "zod";


export const refreshRequestModelSchema = z.object({"refreshToken": z.string().nullish()});