import type { ClassType } from "./ClassType";
import type { OtherBatches } from "./OtherBatches";
import type { TimeSlot } from "./TimeSlot";
import type { Room } from "./Room";
import type { Trainer } from "./Trainer";
import type { ClassTrainee } from "./ClassTrainee";
import type { Attendance } from "./Attendance";

export type OtherClass = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
    /**
     * @type string | undefined
    */
    name?: string | null;
    /**
     * @type integer | undefined int32
    */
    typeId?: number;
    type?: ClassType;
    /**
     * @type integer | undefined int32
    */
    dayNumber?: number | null;
    /**
     * @type integer | undefined int32
    */
    batchId?: number;
    batch?: OtherBatches;
    /**
     * @type integer | undefined int32
    */
    timeSlotId?: number;
    timeSlot?: TimeSlot;
    /**
     * @type integer | undefined int32
    */
    roomId?: number | null;
    room?: Room;
    /**
     * @type integer | undefined int32
    */
    trainerId?: number | null;
    trainer?: Trainer;
    /**
     * @type array | undefined
    */
    classTrainees?: ClassTrainee[] | null;
    /**
     * @type array | undefined
    */
    attendance?: Attendance[] | null;
};
