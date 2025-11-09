"use client";

import { useState, useEffect } from "react";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";
import { Tag } from "@/types/note";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState<Tag>(draft.tag);

  // Синхронізація стану форми з draft у store
  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newNote = { title, content, tag };
    await createNote(newNote);

    clearDraft(); // очищаємо draft після успішного створення
    router.back(); // повертаємося на попередній маршрут
  };

  const handleCancel = () => {
    router.back(); // повернення без очищення draft
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.label}>
        Title
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value as Tag)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={css.actions}>
        <button type="button" onClick={handleCancel} className={css.cancelButton}>
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          Save Note
        </button>
      </div>
    </form>
  );
}