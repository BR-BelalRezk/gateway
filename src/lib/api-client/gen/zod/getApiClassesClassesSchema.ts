import { z } from "zod";

import { classSchema } from "./classSchema";


      /**
       * @description Success
       */
export const getApiClassesClassesQueryResponseSchema = z.array(z.lazy(() => classSchema).schema);