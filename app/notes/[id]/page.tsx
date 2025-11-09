import { dehydrate, QueryClient } from "@tanstack/react-query";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};


export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;

 
  const note = await fetchNoteById(id);

  const title = note.title || "Note Details";
  const description =
    note.content?.slice(0, 120) + "..." || "Detailed information about this note.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-domain.com/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Preview image for note ${title}`,
        },
      ],
    },
  };
};

// 🟢 Основна сторінка нотатки
export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  // Попередньо завантажуємо дані нотатки
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NoteDetailsClient id={id} />
    </TanStackProvider>
  );
}