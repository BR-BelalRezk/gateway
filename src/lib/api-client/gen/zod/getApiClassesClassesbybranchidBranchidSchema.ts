import { z } from "zod";

import { classSchema } from "./classSchema";

export const getApiClassesClassesbybranchidBranchidPathParamsSchema = z.object({"branchId": z.number()});

      /**
       * @description Success
       */
export const getApiClassesClassesbybranchidBranchidQueryResponseSchema = z.array(z.lazy(() => classSchema).schema);