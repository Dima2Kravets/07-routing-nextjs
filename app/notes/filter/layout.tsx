import { Suspense } from "react";
import css from "@/app/notes/filter/LayoutNotes.module.css";
export default function LayoutNotes({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <div className={css.container}>
      <Suspense fallback={<div>Loading categories...</div>}>
        <div className={css.sidebar}>{sidebar}</div></Suspense>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}