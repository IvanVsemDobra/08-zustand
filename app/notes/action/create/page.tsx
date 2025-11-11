"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { Tag } from "@/types/note";
import css from "./CreateNote.module.css";
import toast from "react-hot-toast";

export default function CreateNotePage() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange =
    (field: keyof typeof draft) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setDraft({ ...draft, [field]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!draft.title.trim() || !draft.content.trim()) {
      toast.error("Please fill in all the fields.");
      return;
    }

    setIsLoading(true);

    try {
      const newNote = {
        title: draft.title.trim(),
        content: draft.content.trim(),
        tag: draft.tag as Tag,
      };

      await createNote(newNote);
      clearDraft();

      toast.success("The note has been successfully created!", {
        duration: 3000,
        position: "top-right",
      });

      setTimeout(() => {
        router.push(`/notes/filter/${draft.tag || "all"}`);
      }, 1000);
    } catch (err) {
      console.error("Failed to create note:", err);
      toast.error("Failed to create the note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>

        <form onSubmit={handleSubmit} className={css.form}>
          <label className={css.label}>Title</label>
          <input
            type="text"
            placeholder="Enter note title"
            value={draft.title}
            onChange={handleChange("title")}
            className={css.input}
          />

          <label className={css.label}>Content</label>
          <textarea
            placeholder="Enter note content"
            value={draft.content}
            onChange={handleChange("content")}
            className={css.textarea}
          />

          <label className={css.label}>Tag</label>
          <select
            value={draft.tag}
            onChange={handleChange("tag")}
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/notes/filter/all")}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={css.submitButton}
            >
              {isLoading ? "Creating..." : "Create note"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}