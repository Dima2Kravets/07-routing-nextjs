"use client";

import css from "@/app/notes/Notes.client.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox"
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import Modal from "@/components/Modal/Modal";
export default function NoteClient() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSetSearchQuery = useDebouncedCallback((query: string) => {
    setPage(1);
    setSearchQuery(query);
  }, 300);
  
  const { data } = useQuery({
    queryKey: ["notes", page, searchQuery],
    queryFn: () => fetchNotes(page, searchQuery),
    placeholderData: keepPreviousData,
  });
 
  const totalPages = data?.totalPages || 0;
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSetSearchQuery}/>
        {totalPages > 1 && (
        <Pagination 
          totalPages={totalPages} 
          currentPage={page} 
          onPageChange={setPage} 
        />
        )}
        <button className={css.button} onClick={openModal}>Create note +</button>
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
