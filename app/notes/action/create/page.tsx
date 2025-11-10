"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import css from "./CreateNote.module.css";
import type { DraftNote } from "@/types/note";

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [formData, setFormData] = useState<DraftNote>(draft);
  const router = useRouter();

  useEffect(() => {
    setFormData(draft);
  }, [draft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setDraft(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // --- Локальне збереження нотатки ---
    console.log("Note saved locally:", formData);

    clearDraft();          // очищаємо чернетку
    router.push("/notes"); // редірект на список нотаток
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        name="title"
        value={formData.title || ""}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="content"
        value={formData.content || ""}
        onChange={handleChange}
        placeholder="Content"
      />
      <select name="tag" value={formData.tag || "Todo"} onChange={handleChange}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
}