"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import type { NoteFormData, Tag } from "@/types/note";
import toast from "react-hot-toast";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const [formData, setFormData] = useState<NoteFormData>(draft);

  // синхронізація з Zustand
  useEffect(() => {
    setFormData(draft);
  }, [draft]);

  // хендлер зміни полів
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value as string | Tag };
    setFormData(updated);
    setDraft(updated);
  };

  // мутація створення нотатки через TanStack Query
  const mutation = useMutation({
    mutationFn: async () => {
      const newNote = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        tag: formData.tag,
      };
      return await createNote(newNote);
    },
    onSuccess: () => {
      // інвалідуємо кеш, щоб оновити список нотаток
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      toast.success("The note has been successfully created!", {
        duration: 3000,
        position: "top-right",
      });
      router.push("/notes/filter/all");
    },
    onError: () => {
      toast.error("Failed to create the note. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all the fields.");
      return;
    }
    mutation.mutate();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        name="title"
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
        required
      />

      <select name="tag" value={formData.tag} onChange={handleChange}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <div className={css.buttons}>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}