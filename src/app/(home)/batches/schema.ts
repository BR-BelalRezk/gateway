import { z } from "zod";

export const branchSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const classTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const roomSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  link: z.string().nullable(),
});

export const timeSlotSchema = z.object({
  id: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  day1: z.string(),
  day2: z.string(),
});

export const aspNetUserSchema = z.object({
  id: z.string(),
  userName: z.string(),
  normalizedUserName: z.string(),
  email: z.string(),
  normalizedEmail: z.string(),
  emailConfirmed: z.boolean(),
  passwordHash: z.string(),
  securityStamp: z.string(),
  concurrencyStamp: z.string(),
  phoneNumber: z.string().nullable(),
  phoneNumberConfirmed: z.boolean(),
  twoFactorEnabled: z.boolean(),
  lockoutEnd: z.date().nullable(),
  lockoutEnabled: z.boolean(),
  accessFailedCount: z.number(),
  branchId: z.number(),
  branch: branchSchema.nullable(),
  image: z.string().nullable(),
});

export const trainerSchema = z.object({
  id: z.number(),
  branchId: z.number(),
  branch: branchSchema,
  aspNetUserId: z.string(),
  aspNetUser: aspNetUserSchema,
});

export const countrySchema = z.object({
  id: z.number(),
  name: z.string(),
  iso3: z.string(),
  iso2: z.string(),
  phone_code: z.string(),
  currency: z.string(),
});

export const citySchema = z.object({
  id: z.number(),
  name: z.string(),
  countryId: z.number(),
  country: countrySchema,
});

export const levelSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const paymentHistorySchema = z.object({
  id: z.number(),
  paymentDate: z.string().nullish(),
  paidValue: z.number(),
  remainingValue: z.number().nullable(),
  paidStatus: z.string().nullable(),
  paidType: z.string().nullable(),
  notes: z.string(),
  traineeId: z.number(),
});

export const classTraineeNestedSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  mobile: z.string(),
  birthdate: z.string().nullable(),
  address: z.string().nullish(),
  email: z.string().nullish(),
  startTimeForTest: z.string().nullable(),
  isDeleted: z.boolean(),
  preferredDayForTest: z.string().nullable(),
  preferredSlotId: z.number().nullable(),
  preferredSlot: timeSlotSchema.nullable(),
  branchId: z.number(),
  branch: branchSchema.nullable(),
  attendType: z.string().nullable(),
  levelId: z.number().nullable(),
  status: z.string().nullable(),
  notes: z.string().nullable(),
  education: z.string().nullable(),
  job: z.string().nullable(),
  testDate: z.string().nullable(),
  country: countrySchema.nullable(),
  countryId: z.number().nullable(),
  city: citySchema.nullable(),
  cityId: z.number().nullable(),
  level: levelSchema.nullable(),
  assignedTrainerId: z.number().nullable(),
  assignedTrainer: trainerSchema.nullable(),
  followUpUser: z.array(aspNetUserSchema.nullable()).nullable(),
  paymentHistory: z.array(paymentHistorySchema).nullable(),
});

export const classTraineeSchema = z.object({
  id: z.number(),
  classId: z.number(),
  traineeId: z.number(),
  trainee: classTraineeNestedSchema,
  adminNotes: z.string().nullable(),
  trainerNotes: z.string().nullable(),
});

export const batchSchema = z.object({
  id: z.number(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  isActive: z.boolean(),
  branchId: z.number(),
  branch: branchSchema,
});

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const batchWithClassCountSchema = z.object({
  batch: batchSchema,
  classCount: z.number(),
});

export type Batch = z.infer<typeof batchSchema>;
export type BatchWithClassCount = z.infer<typeof batchWithClassCountSchema>;

export const classSchema = z.object({
  id: z.number(),
  name: z.string(),
  typeId: z.number(),
  type: classTypeSchema,
  dayNumber: z.number(),
  batchId: z.number(),
  batch: batchSchema,
  timeSlotId: z.number(),
  timeSlot: timeSlotSchema,
  roomId: z.number(),
  room: roomSchema,
  levelId: z.number(),
  level: levelSchema,
  trainerId: z.number(),
  trainer: trainerSchema,
  classTrainees: z.array(classTraineeSchema),
});

export type Class = z.infer<typeof classSchema>;
export type Room = z.infer<typeof roomSchema>;
export type ClassTrainee = z.infer<typeof classTraineeSchema>;



export const traineeAttendanceSchema = z.object({
  id: z.number(),
  dayNumber: z.number(),
  classId: z.number(),
  noteFromSession: z.string().nullable(),
});

export const traineeInAttendanceSchema = z.object({
  trainee: classTraineeNestedSchema,
  attendance: z.array(traineeAttendanceSchema),
  trainerNote: z.string().nullable(),
  classId: z.number(),
  adminNotes: z.string().nullable(),
  trainerNotes: z.string().nullable()
});

export type TraineeInAttendance = z.infer<typeof traineeInAttendanceSchema>;
