"use server";

import { z } from "zod";
import { CreateNoteInput, CreateNoteResponse, DeleteNoteResponse, Note, TraineeCreationInfo, createNoteResponseSchema, deleteNoteResponseSchema, noteSchema, traineeCreationInfoSchema } from "@/app/(home)/(dashboard)/schema";
import { getCurrentUser } from "@/lib/session";
import { getApiAuthenticateCreatetraineecount } from "@/lib/api-client/gen";


export async function getTraineeCreationInfo(): Promise<{ ok: false; error: string } | { ok: true, data: TraineeCreationInfo }> {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false, error: "unauthenticated" };
  }

  try {
    const res = await getApiAuthenticateCreatetraineecount({
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    })

    return { ok: true, data: res };
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}

export async function getNotes(): Promise<Note[]> {
  const res = await fetch(`${process.env.API_URL}/api/Entities/notes`, {
    cache: "no-store",
  });

  const notesJson = await res.json();
  const notes = z.array(noteSchema).parse(notesJson);

  return notes;
}


export async function createNote(input: CreateNoteInput): Promise<CreateNoteResponse> {
  const user = await getCurrentUser();

  if (!user) {
    return { status: "failed", message: "unauthenticated" };
  }
  const res = await fetch(`${process.env.API_URL}/api/Entities/notes`, {
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });

  const responseJSON = await res.json();
  const responseData = createNoteResponseSchema.parse(responseJSON);

  return responseData;
}


export async function deleteNote(noteId: string): Promise<DeleteNoteResponse> {
  const user = await getCurrentUser();

  if (!user) {
    return { status: "Ok", message: "unauthenticated" };
  }
  const res = await fetch(`${process.env.API_URL}/api/Entities/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });

  const responseJSON = await res.json();
  const responseData = deleteNoteResponseSchema.parse(responseJSON);

  return responseData;
}