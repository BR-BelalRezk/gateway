import { z } from "zod";

import { roomSchema } from "./roomSchema";

export const postApiEntitiesRoomsMutationResponseSchema = z.any();
export const postApiEntitiesRoomsMutationRequestSchema = z.lazy(() => roomSchema).schema;