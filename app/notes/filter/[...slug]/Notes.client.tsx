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
import type { Tag } from "@/types/note";


export default function NotesClient({ tag }: {  tag: Tag | string  }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  // скидати сторінку при зміні пошуку або тегу
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, tag]);

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["notes", { search: debouncedSearch, tag, page }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        tag,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
      <SearchBox onSearch={setSearch} searchQuery={search} />

      {isSuccess && data?.totalPages && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      <Link href="/notes/action/create" className={css.button}>
        Create note +
      </Link>
      </header>
      {isLoading && <Loading />}
      {isError && <Error error={error} />}
      {data && <NoteList notes={data.notes} />}
    </div>
  );
}