import css from "./create.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note or save it as a draft in NoteHub.",
  alternates: { canonical: "/notes/action/create" },
  openGraph: {
    title: "Create a new note - NoteHub",
    description: "Easily create and manage your notes in NoteHub.",
    url: "https://notehub-public.goit.study/notes/action/create",
    images: [
      {
        url: "/og-create-note.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note Page",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}