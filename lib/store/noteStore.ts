import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DraftNote } from "@/types/note";

type NoteDraftStore = {
  draft: DraftNote;
  setDraft: (note: DraftNote) => void;
  clearDraft: () => void;
};

//  Додали дефолтне значення priority
const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
  categoryId: "",
  priority: "Low", 
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);

