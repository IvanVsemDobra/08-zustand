export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewNote {
  title: string;
  content?: string; 
  categoryId: string;
}

// Для форми та чернетки з тегом
export interface DraftNote {
  title: string;
  content?: string;
  tag: Tag;
  categoryId: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  tag: Tag;
  categoryId: string;
}

export interface CategoryType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  tag?: Tag;
  categoryId?: string;
}