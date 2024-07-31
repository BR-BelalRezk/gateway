import type { Trainee } from "./Trainee";

export type GetApiTraineeIdPathParams = {
    /**
     * @type integer int32
    */
    id: number;
};

/**
 * @description Success
*/
export type GetApiTraineeIdQueryResponse = Trainee;
