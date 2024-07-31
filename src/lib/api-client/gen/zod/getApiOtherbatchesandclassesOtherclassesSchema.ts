import { z } from "zod";

import { otherClassSchema } from "./otherClassSchema";


      /**
       * @description Success
       */
export const getApiOtherbatchesandclassesOtherclassesQueryResponseSchema = z.array(z.lazy(() => otherClassSchema).schema);