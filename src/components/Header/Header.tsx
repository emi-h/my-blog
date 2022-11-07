import Link from "next/link";
import React, { useState } from "react";
import styles from "src/components/Header/Header.module.css";

import { BtnMenu } from "../BtnMenu/BtnMenu";
import { Nav } from "../Nav/Nav";

export const Header = () => {
  const [menu, setMenu] = useState(false);

  const handleClick = () => {
    setMenu((prev) => !prev);
  };
  const handleNavClose = () => {
    setMenu(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          <Link href="/">console.log(emi)</Link>
        </h1>
        <Nav menu={menu} hendleNavClose={handleNavClose} />
        <BtnMenu menu={menu} handleClick={handleClick} />
      </div>
    </header>
  );
};
