import type { TraineeStatusDto } from "./TraineeStatusDto";

export type GetApiTraineeSearchtraineebyphoneQueryParams = {
    /**
     * @type string | undefined
    */
    phoneNumber?: string;
};

/**
 * @description Success
*/
export type GetApiTraineeSearchtraineebyphoneQueryResponse = TraineeStatusDto;
