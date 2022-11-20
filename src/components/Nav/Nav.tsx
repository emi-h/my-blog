import Link from "next/link";
import { FC } from "react";
import styles from "src/components/Nav/Nav.module.css";
import { headerNavList } from "src/data/navdata";

export const Nav: FC<{
  handleNavClose: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  menu: boolean;
}> = ({ handleNavClose, menu }) => {
  const OpenStyle = menu ? styles.open : undefined;

  return (
    <ul className={`${styles.navList} ${OpenStyle}`}>
      {headerNavList.map((list) => {
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
