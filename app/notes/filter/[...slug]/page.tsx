import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Tag } from "@/types/note";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

// 🟣 Динамічні метадані
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;

  // Безпечне отримання тегу
  const slugArray: string[] = Array.isArray(slug) ? slug : slug ? [slug] : ["all"];
  const tag: string = slugArray[0] === "all" ? "all" : slugArray[0];

  const title = `Notes filtered by: ${tag}`;
  const description = `Browse all notes filtered by the category: ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-domain.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${tag}`,
        },
      ],
    },
  };
};

// 🟢 Основна сторінка
const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const slugArray: string[] = Array.isArray(slug) ? slug : slug ? [slug] : ["all"];
  const tag: Tag | string = slugArray[0] === "all" ? "" : slugArray[0];

  const queryClient = new QueryClient();

  // Попереднє завантаження нотаток
  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", category: tag, page: 1 }],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;