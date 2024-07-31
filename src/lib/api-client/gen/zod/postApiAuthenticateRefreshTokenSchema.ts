import { z } from "zod";

import { refreshRequestModelSchema } from "./refreshRequestModelSchema";

export const postApiAuthenticateRefreshTokenMutationResponseSchema = z.any();
export const postApiAuthenticateRefreshTokenMutationRequestSchema = z.lazy(() => refreshRequestModelSchema).schema;