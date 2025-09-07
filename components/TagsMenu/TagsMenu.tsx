'use client';
import { useState } from 'react';
import Link from 'next/link';
import css from "@/components/TagsMenu/TagsMenu.module.css"

export default function TagsMenu () {
const tags = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
       Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
              {tags.map((tag) => (
             <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} onClick={toggle} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

