import { z } from "zod";

import { registerModelSchema } from "./registerModelSchema";

export const postApiAuthenticateRegisterMutationResponseSchema = z.any();
export const postApiAuthenticateRegisterMutationRequestSchema = z.lazy(() => registerModelSchema).schema;