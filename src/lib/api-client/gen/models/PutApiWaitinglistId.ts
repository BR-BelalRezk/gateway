import type { TimeSpan } from "./TimeSpan";
import type { PaymentHistory } from "./PaymentHistory";

export type PutApiWaitinglistIdMutationResponse = any | null;

export type PutApiWaitinglistIdPathParams = {
    /**
     * @type integer int32
    */
    Id: number;
};

export type PutApiWaitinglistIdQueryParams = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
    /**
     * @type string | undefined
    */
    status?: string;
    /**
     * @type string | undefined
    */
    Notes?: string;
    /**
     * @type string | undefined
    */
    testNotes?: string;
    /**
     * @type string | undefined date-time
    */
    PaymentDate?: string;
    /**
     * @type number | undefined double
    */
    PaidValue?: number;
    /**
     * @type number | undefined double
    */
    RemainingValue?: number;
    /**
     * @type string | undefined
    */
    PaidStatus?: string;
    /**
     * @type string | undefined
    */
    PaidType?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.Id"?: number;
    /**
     * @type string | undefined
    */
    "trainee.FullName"?: string;
    /**
     * @type string | undefined
    */
    "trainee.Mobile"?: string;
    /**
     * @type string | undefined
    */
    "trainee.Birthdate"?: string;
    /**
     * @type string | undefined
    */
    "trainee.Address"?: string;
    /**
     * @type string | undefined
    */
    "trainee.Email"?: string;
    "trainee.StartTimeForTest"?: TimeSpan;
    /**
     * @type boolean | undefined
    */
    "trainee.IsDeleted"?: boolean;
    /**
     * @type string | undefined
    */
    "trainee.PreferredDayForTest"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.PreferredSlotId"?: number;
    /**
     * @type integer | undefined int32
    */
    "trainee.PreferredSlot.Id"?: number;
    "trainee.PreferredSlot.StartTime"?: TimeSpan;
    "trainee.PreferredSlot.EndTime"?: TimeSpan;
    /**
     * @type string | undefined
    */
    "trainee.PreferredSlot.Day1"?: string;
    /**
     * @type string | undefined
    */
    "trainee.PreferredSlot.Day2"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.SecondPreferredSlotId"?: number;
    /**
     * @type integer | undefined int32
    */
    "trainee.SecondPreferredSlot.Id"?: number;
    "trainee.SecondPreferredSlot.StartTime"?: TimeSpan;
    "trainee.SecondPreferredSlot.EndTime"?: TimeSpan;
    /**
     * @type string | undefined
    */
    "trainee.SecondPreferredSlot.Day1"?: string;
    /**
     * @type string | undefined
    */
    "trainee.SecondPreferredSlot.Day2"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.BranchId"?: number;
    /**
     * @type integer | undefined int32
    */
    "trainee.Branch.Id"?: number;
    /**
     * @type string | undefined
    */
    "trainee.Branch.Name"?: string;
    /**
     * @type string | undefined
    */
    "trainee.AttendType"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.LevelId"?: number;
    /**
     * @type string | undefined
    */
    "trainee.Status"?: string;
    /**
     * @type string | undefined
    */
    "trainee.CurrentStatus"?: string;
    /**
     * @type string | undefined
    */
    "trainee.Notes"?: string;
    /**
     * @type string | undefined
    */
    "trainee.Education"?: string;
    /**
     * @type string | undefined
    */
    "trainee.Job"?: string;
    /**
     * @type string | undefined date-time
    */
    "trainee.testDate"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.Country.Id"?: number;
    /**
     * @type string | undefined
    */
    "trainee.Country.name"?: string;
    /**
     * @type string | undefined
    */
    "trainee.Country.iso3"?: string;
    /**
     * @type string | undefined
    */
    "trainee.Country.iso2"?: string;
    /**
     * @type string | undefined
    */
    "trainee.Country.phone_code"?: string;
    /**
     * @type string | undefined
    */
    "trainee.Country.currency"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.CountryId"?: number;
    /**
     * @type integer | undefined int32
    */
    "trainee.City.Id"?: number;
    /**
     * @type string | undefined
    */
    "trainee.City.name"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.City.CountryId"?: number;
    /**
     * @type integer | undefined int32
    */
    "trainee.City.Country.Id"?: number;
    /**
     * @type string | undefined
    */
    "trainee.City.Country.name"?: string;
    /**
     * @type string | undefined
    */
    "trainee.City.Country.iso3"?: string;
    /**
     * @type string | undefined
    */
    "trainee.City.Country.iso2"?: string;
    /**
     * @type string | undefined
    */
    "trainee.City.Country.phone_code"?: string;
    /**
     * @type string | undefined
    */
    "trainee.City.Country.currency"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.CityId"?: number;
    /**
     * @type string | undefined
    */
    "trainee.typeOfGender"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.Level.Id"?: number;
    /**
     * @type string | undefined
    */
    "trainee.Level.Name"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.AssignedTrainerId"?: number;
    /**
     * @type integer | undefined int32
    */
    "trainee.AssignedTrainer.Id"?: number;
    /**
     * @type integer | undefined int32
    */
    "trainee.AssignedTrainer.BranchId"?: number;
    /**
     * @type integer | undefined int32
    */
    "trainee.AssignedTrainer.Branch.Id"?: number;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.Branch.Name"?: string;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUserId"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.AssignedTrainer.AspNetUser.BranchId"?: number;
    /**
     * @type integer | undefined int32
    */
    "trainee.AssignedTrainer.AspNetUser.Branch.Id"?: number;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.Branch.Name"?: string;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.image"?: string;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.Id"?: string;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.UserName"?: string;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.NormalizedUserName"?: string;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.Email"?: string;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.NormalizedEmail"?: string;
    /**
     * @type boolean | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.EmailConfirmed"?: boolean;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.PasswordHash"?: string;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.SecurityStamp"?: string;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.ConcurrencyStamp"?: string;
    /**
     * @type string | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.PhoneNumber"?: string;
    /**
     * @type boolean | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.PhoneNumberConfirmed"?: boolean;
    /**
     * @type boolean | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.TwoFactorEnabled"?: boolean;
    /**
     * @type string | undefined date-time
    */
    "trainee.AssignedTrainer.AspNetUser.LockoutEnd"?: string;
    /**
     * @type boolean | undefined
    */
    "trainee.AssignedTrainer.AspNetUser.LockoutEnabled"?: boolean;
    /**
     * @type integer | undefined int32
    */
    "trainee.AssignedTrainer.AspNetUser.AccessFailedCount"?: number;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUserId"?: string;
    /**
     * @type integer | undefined int32
    */
    "trainee.FollowUpUser.BranchId"?: number;
    /**
     * @type integer | undefined int32
    */
    "trainee.FollowUpUser.Branch.Id"?: number;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUser.Branch.Name"?: string;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUser.image"?: string;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUser.Id"?: string;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUser.UserName"?: string;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUser.NormalizedUserName"?: string;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUser.Email"?: string;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUser.NormalizedEmail"?: string;
    /**
     * @type boolean | undefined
    */
    "trainee.FollowUpUser.EmailConfirmed"?: boolean;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUser.PasswordHash"?: string;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUser.SecurityStamp"?: string;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUser.ConcurrencyStamp"?: string;
    /**
     * @type string | undefined
    */
    "trainee.FollowUpUser.PhoneNumber"?: string;
    /**
     * @type boolean | undefined
    */
    "trainee.FollowUpUser.PhoneNumberConfirmed"?: boolean;
    /**
     * @type boolean | undefined
    */
    "trainee.FollowUpUser.TwoFactorEnabled"?: boolean;
    /**
     * @type string | undefined date-time
    */
    "trainee.FollowUpUser.LockoutEnd"?: string;
    /**
     * @type boolean | undefined
    */
    "trainee.FollowUpUser.LockoutEnabled"?: boolean;
    /**
     * @type integer | undefined int32
    */
    "trainee.FollowUpUser.AccessFailedCount"?: number;
    /**
     * @type array | undefined
    */
    "trainee.PaymentHistory"?: PaymentHistory[];
    /**
     * @type integer | undefined int32
    */
    traineeId?: number;
    /**
     * @type boolean | undefined
    */
    isDeleted?: boolean;
};
