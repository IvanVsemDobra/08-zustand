import axios from "axios";
import type {
  Note,
  NewNote,
  CategoryType,
  FetchNotesResponse,
  FetchNotesParams,
  UpdateNoteData,
  Tag,
} from "@/types/note";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study/api";

/**
 *  Створює axios-інстанс із токеном авторизації
 */
const getApiInstance = () => {
  let token: string | null = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || null;

  // Якщо код виконується у браузері — дістаємо токен із localStorage
  if (typeof window !== "undefined" && !token) {
    token = localStorage.getItem("authToken");
  }

  if (!token) {
    console.warn("Authorization token missing! Some requests may fail (401).");
  }

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      "Content-Type": "application/json",
    },
  });
};

//
// ================== NOTES ==================
//

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
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

export const createNote = async (newNote: { title: string; content: string; tag: Tag }) => {
  const api = getApiInstance();
  const res = await api.post("/notes", newNote);
  return res.data;
};

export const editNote = async (id: string, data: UpdateNoteData): Promise<Note> => {
  const api = getApiInstance();
  const res = await api.patch<Note>(`/notes/${id}`, data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<{ message: string }> => {
  const api = getApiInstance();
  const res = await api.delete<{ message: string }>(`/notes/${id}`);
  return res.data;
};

//
// ================== CATEGORIES ==================
//

export const getCategories = async (): Promise<CategoryType[]> => {
  const api = getApiInstance();
  const res = await api.get<CategoryType[]>("/categories");
  return res.data;
};