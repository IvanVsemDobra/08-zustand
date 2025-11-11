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

// Новий запис (тільки те, що API приймає)
export interface NewNote {
  title: string;
  content: string;
  tag: Tag;
  categoryId?: string;
}

// Чернетка (для локального збереження)
export interface DraftNote {
  title: string;
  content: string;
  tag: Tag;
  categoryId: string;
  priority?: "Low" | "Medium" | "High"; // локальне поле, не відправляється
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