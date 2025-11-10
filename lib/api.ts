import axios from "axios";
import type {
  Note,
  NewNote,
  CategoryType,
  FetchNotesResponse,
  FetchNotesParams,
  UpdateNoteData
} from "@/types/note";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study/api";

const getApiInstance = () => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!token) throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is missing!");

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// ================== NOTES ==================

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const api = getApiInstance();
  const queryParams: Record<string, string | number> = {
    page: params.page,
    perPage: params.perPage,
  };
  if (params.search) queryParams.search = params.search;
  if (params.tag && params.tag !== "all") queryParams.tag = params.tag;

  const res = await api.get<FetchNotesResponse>("/notes", { params: queryParams });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const api = getApiInstance();
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const api = getApiInstance();
  const res = await api.post<Note>("/notes", newNote);
  return res.data;
};

export const editNote = async (id: string, data: UpdateNoteData): Promise<Note> => {
  const api = getApiInstance();
  const res = await api.patch<Note>(`/notes/${id}`, data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const api = getApiInstance();
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

// ================== CATEGORIES ==================

export const getCategories = async (): Promise<CategoryType[]> => {
  const api = getApiInstance();
  const res = await api.get<CategoryType[]>("/categories");
  return res.data;
};