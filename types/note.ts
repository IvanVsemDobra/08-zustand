export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

// Новий запис (тільки те, що API приймає)
export interface NewNote {
  title: string;
  content: string;
  tag: Tag;
  categoryId?: string;
}


export interface NoteFormData {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
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

export interface CategoryType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  tag?: Tag;
  categoryId?: string;
}