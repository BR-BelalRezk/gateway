import { z } from "zod";


export const notesViewModelSchema = z.object({"id": z.number().nullish(),"note": z.string().nullish()});