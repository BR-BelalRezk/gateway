import { z } from "zod";

import { roomSchema } from "./roomSchema";

export const putApiEntitiesRoomIdMutationResponseSchema = z.any();
export const putApiEntitiesRoomIdPathParamsSchema = z.object({"id": z.number()});
export const putApiEntitiesRoomIdMutationRequestSchema = z.lazy(() => roomSchema).schema;