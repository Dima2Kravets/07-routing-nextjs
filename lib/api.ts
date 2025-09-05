import axios from "axios";

import type { Note, NewNoteData } from "@/types/note"
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  }
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
export const fetchNotes = async (
  page: number,
  searchTerm: string,
  perPage: number = 12,
  sortBy: "created" | "updated" | "title" = "created"
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(
    `/notes`, {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
      params: {
      page,
      perPage,
      sortBy,
      search: searchTerm,
      },
  }
  );
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note>=> {
  const response = await axios.delete<Note>(`/notes/${noteId}`,{
      headers: {
        Authorization: `Bearer ${myKey}`,
      }
  } );
  return response.data;
};

export const createNote = async (noteData: NewNoteData):Promise<Note> => {
  const res = await axios.post<Note>("/notes", noteData, {
      headers: {
        Authorization: `Bearer ${myKey}`,
      }
  });
  return res.data;
};


export const fetchNoteById = async (id: string) => {
  const respons = await axios.get<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${myKey}`,
      }
  });
  return respons.data;
};