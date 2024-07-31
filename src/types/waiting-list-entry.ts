import { Trainee } from "./trainee";

export interface WaitingListEntry {
  id: number;
  status: string;
  notes?: any;
  testNotes: string;
  paymentDate: string;
  paidValue?: any;
  remainingValue?: any;
  paidStatus: string;
  paidType?: any;
  timeSlot1?: any;
  timeSlot1Id?: any;
  timeSlot2?: any;
  timeSlot2Id?: any;
  trainee: Trainee;
  traineeId: number;
}
