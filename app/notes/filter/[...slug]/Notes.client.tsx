"use client";
import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./LayoutNotes.module.css";
import Pagination from "@/components/Pagination/Pagination";
import { useDebounce } from "@/components/hooks/UseDebounce";
import NoteList from "@/components/NoteList/NoteList";
import Loading from "@/app/loading";
import Error from "./error";
import Link from "next/link";

interface NotesClientProps {
  category: string;
}

export default function NotesClient({ category }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");

  const debouncedSearch = useDebounce(topic, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category]);

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["notes", { search: debouncedSearch, category, page }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        tag: category,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div className={css.app}>
      <SearchBox onSearch={setTopic} searchQuery={topic} />

      {isSuccess && data?.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      <Link href="/notes/action/create" className={css.button}>
        Create note +
      </Link>

      {isLoading && <Loading />}
      {isError && <Error error={error} />}
      {data && <NoteList notes={data.notes} />}
    </div>
  );
}