import { z } from "zod";

export const traineeCreationInfoSchema = z.object({
  myTraineeCount: z.number(),
  usersWithHighestCountLogs: z.number(),
  usersWithHighestCountName: z.string().nullable(),
});

export type TraineeCreationInfo = z.infer<typeof traineeCreationInfoSchema>;

export const noteSchema = z.object({
  id: z.number(),
  note: z.string(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable()
});

export type Note = z.infer<typeof noteSchema>;


export const createNoteInputSchema = z.object({
  note: z.string(),
});

export type CreateNoteInput = z.infer<typeof createNoteInputSchema>;


export const createNoteResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
});

export type CreateNoteResponse = z.infer<typeof createNoteResponseSchema>;



export const deleteNoteResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
});

export type DeleteNoteResponse = z.infer<typeof deleteNoteResponseSchema>;
