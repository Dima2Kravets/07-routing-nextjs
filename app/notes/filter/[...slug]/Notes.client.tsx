"use client";
import css from "@/app/notes/filter/[...slug]/Notes.client.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import Modal from "@/components/Modal/Modal";

type NoteClientProps = {
  tag?: string;
};

export default function NoteClient({ tag }: NoteClientProps) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Якщо обрали "All" → не передаємо тег у бекенд
  const normalizedTag = tag === "All" ? undefined : tag;

  const debouncedSetSearchQuery = useDebouncedCallback((query: string) => {
    setPage(1);
    setSearchQuery(query);
  }, 300);

  const { data } = useQuery({
    queryKey: ["notes", page, searchQuery, normalizedTag],
    queryFn: () => fetchNotes(page, searchQuery, 12, "created", normalizedTag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSetSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onSuccess={closeModal} onCancel={closeModal} />
          </Modal>
        )}
      </header>

      {data && <NoteList notes={data.notes} />}
    </div>
  );
}