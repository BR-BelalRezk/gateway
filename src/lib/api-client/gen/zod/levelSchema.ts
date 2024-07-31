import { z } from "zod";


export const levelSchema = z.object({"id": z.number().optional(),"name": z.string().nullish()});