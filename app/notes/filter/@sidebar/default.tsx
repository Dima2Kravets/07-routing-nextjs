import Link from "next/link";
import css from "@/app/notes/filter/@sidebar/default.module.css"
export default function SidebarNotest() {

    const tags = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];
    return (
         <ul className={css.menuList}>
            {tags.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>
            ))}
    </ul>)
       }
       