import { z } from "zod";

import { loginModelSchema } from "./loginModelSchema";

export const postApiAuthenticateLoginMutationResponseSchema = z.any();
export const postApiAuthenticateLoginMutationRequestSchema = z.lazy(() => loginModelSchema).schema;