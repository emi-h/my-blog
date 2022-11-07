import Link from "next/link";
import { FC } from "react";
import styles from "src/components/Nav/Nav.module.css";

const navList: { href: string; pageName: string }[] = [
  { href: "/about", pageName: "about" },
  { href: "/contact", pageName: "contact" },
];

export const Nav: FC = () => {
  return (
    <ul className={styles.navList}>
      {navList.map((list) => {
        return (
          <li key={list.pageName}>
            <Link href={list.href}>{list.pageName}</Link>
          </li>
        );
      })}
    </ul>
  );
};
