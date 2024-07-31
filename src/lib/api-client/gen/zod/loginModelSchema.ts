import { z } from "zod";


export const loginModelSchema = z.object({"username": z.string().min(1),"password": z.string().min(1)});