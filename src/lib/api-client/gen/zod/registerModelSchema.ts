import { z } from "zod";


export const registerModelSchema = z.object({"username": z.string().min(1),"email": z.string().min(1).email(),"password": z.string().min(1),"role": z.string().nullish(),"branchId": z.number().nullish()});