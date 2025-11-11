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

      console.log("🟢 Sending to API:", newNote);
      await createNote(newNote);

      clearDraft();

      //  Гарне сповіщення
      toast.success("The note has been successfully created!", {
        duration: 3000,
        position: "top-right",
      });

      // Невелика затримка перед редіректом
      setTimeout(() => {
        router.push(`/notes/filter/${draft.tag || "all"}`);
      }, 1000);
    } catch (err) {
      console.error("Failed to create note:", err);
      toast.error("Failed to create the note. Please try again.", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create Note +</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Enter note title"
            value={draft.title}
            onChange={handleChange("title")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Enter note content"
            value={draft.content}
            onChange={handleChange("content")}
            className="border border-gray-300 rounded-lg p-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={draft.tag}
            onChange={handleChange("tag")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </main>
  );
}