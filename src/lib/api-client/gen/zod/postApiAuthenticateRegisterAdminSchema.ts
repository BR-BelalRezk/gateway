import { z } from "zod";

import { registerModelSchema } from "./registerModelSchema";

export const postApiAuthenticateRegisterAdminMutationResponseSchema = z.any();
export const postApiAuthenticateRegisterAdminMutationRequestSchema = z.lazy(() => registerModelSchema).schema;