import { z } from "zod";


export const appVersionSchema = z.object({"id": z.number().optional(),"version": z.string().nullish()});