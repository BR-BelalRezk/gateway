import { Branch } from "./branch";
export interface Trainee {
  id: number;
  fullName: string;
  mobile: string;
  birthdate: string;
  address: string;
  email: string;
  startTimeForTest: string;
  isDeleted: boolean;
  preferredDayForTest?: any;
  preferredSlotId?: any;
  preferredSlot?: any;
  branchId: number;
  branch: Branch;
  attendType: string;
  levelId?: any;
  status?: any;
  notes: string;
  education: string;
  job: string;
  testDate: string;
  country?: any;
  countryId?: any;
  level?: any;
  assignedTrainerId?: any;
  assignedTrainer?: any;
  paymentHistory?: any;
}
