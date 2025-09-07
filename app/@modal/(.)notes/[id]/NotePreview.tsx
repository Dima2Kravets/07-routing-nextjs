"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import css from "@/app/@modal/(.)notes/[id]/NotePreview.module.css"
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

export default function NotePreview () {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
  });
    const handleClose = () => { router.back(); }

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
        ? `Updated at: ${note.updatedAt}`
        : `Created at: ${note.createdAt}`;
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>
            <div className={css.item}>
                <button className={css.backBtn} onClick={handleClose}>Back</button>
            <div className={css.header}>
                    <h2>{note.title}</h2>
                 </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{formattedDate}</p>
             </div>
        </div></Modal>
    );
  
   
};

