import { z } from "zod";


export const roomSchema = z.object({"id": z.number().optional(),"name": z.string().nullish(),"type": z.string().nullish(),"link": z.string().nullish()});