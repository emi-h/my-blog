import Link from "next/link";
import { FC } from "react";
import styles from "src/components/Nav/Nav.module.css";

const navList: { href: string; pageName: string }[] = [
  { href: "/blog/page/1", pageName: "blog" },
  { href: "/about", pageName: "about" },
  { href: "/contact", pageName: "contact" },
];

export const Nav: FC<{
  handleNavClose: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  menu: boolean;
}> = ({ handleNavClose, menu }) => {
  const OpenStyle = menu ? styles.open : undefined;

  return (
    <ul className={`${styles.navList} ${OpenStyle}`}>
      {navList.map((list) => {
        return (
          <li key={list.pageName}>
            <Link href={list.href} onClick={handleNavClose}>
              {list.pageName}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
