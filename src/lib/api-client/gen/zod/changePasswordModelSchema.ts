import { z } from "zod";


export const changePasswordModelSchema = z.object({"id": z.string().nullish(),"oldPassword": z.string().nullish(),"newPassword": z.string().nullish()});