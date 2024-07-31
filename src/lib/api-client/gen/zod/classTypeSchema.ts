import { z } from "zod";


export const classTypeSchema = z.object({"id": z.number().optional(),"name": z.string().nullish()});