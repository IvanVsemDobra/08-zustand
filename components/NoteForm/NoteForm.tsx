"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";
import type { DraftNote, Tag } from "@/types/note";
import axios from "axios";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const [formData, setFormData] = useState<DraftNote>(draft || {
    title: "",
    content: "",
    tag: "Todo",
    categoryId: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Синхронізація локального стану з draft у Zustand
  useEffect(() => {
    if (draft) {
      setFormData(draft);
    }
  }, [draft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setDraft(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      // POST запит для створення нотатки
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/notes`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
          },
        }
      );

      clearDraft();                // очищаємо draft після успішного створення
      router.push("/notes/filter/all"); // редірект на всі нотатки
    } catch (err) {
      console.error(err);
      setError("Failed to create note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // просто редірект, draft не чіпаємо
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      {error && <p className={css.error}>{error}</p>}

      <input
        name="title"
        value={formData.title || ""}
        onChange={handleChange}
        placeholder="Title"
        required
      />

      <textarea
        name="content"
        value={formData.content || ""}
        onChange={handleChange}
        placeholder="Content"
        required
      />

      <select name="tag" value={formData.tag || "Todo"} onChange={handleChange}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <div className={css.buttons}>
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}