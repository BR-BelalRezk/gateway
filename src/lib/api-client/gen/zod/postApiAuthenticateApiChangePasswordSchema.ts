import { z } from "zod";

import { changePasswordModelSchema } from "./changePasswordModelSchema";

export const postApiAuthenticateApiChangePasswordMutationResponseSchema = z.any();
export const postApiAuthenticateApiChangePasswordMutationRequestSchema = z.lazy(() => changePasswordModelSchema).schema;