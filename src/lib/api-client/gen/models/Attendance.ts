import type { Trainee } from "./Trainee";
import type { Class } from "./Class";

export type Attendance = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
    /**
     * @type integer | undefined int32
    */
    traineeId?: number;
    trainee?: Trainee;
    /**
     * @type integer | undefined int32
    */
    dayNumber?: number;
    /**
     * @type integer | undefined int32
    */
    classId?: number;
    class?: Class;
    /**
     * @type string | undefined
    */
    noteFromSession?: string | null;
    /**
     * @type string | undefined
    */
    noteFromTrainer?: string | null;
};
