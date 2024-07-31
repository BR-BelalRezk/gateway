import type { Trainee } from "./Trainee";

export type HoldingList = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
    trainee?: Trainee;
    /**
     * @type integer | undefined int32
    */
    traineeId?: number;
    /**
     * @type string | undefined
    */
    notes?: string | null;
};
