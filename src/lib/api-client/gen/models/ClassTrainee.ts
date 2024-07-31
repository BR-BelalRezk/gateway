import type { Trainee } from "./Trainee";

export type ClassTrainee = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
    /**
     * @type integer | undefined int32
    */
    classId?: number;
    /**
     * @type integer | undefined int32
    */
    traineeId?: number;
    trainee?: Trainee;
    /**
     * @type string | undefined
    */
    adminNotes?: string | null;
    /**
     * @type string | undefined
    */
    trainerNotes?: string | null;
    /**
     * @type boolean | undefined
    */
    isDeleted?: boolean;
};
