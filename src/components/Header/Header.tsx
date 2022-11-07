import Link from "next/link";
import React from "react";
import styles from "src/components/Header/Header.module.css";

import { Nav } from "../Nav/Nav";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          <Link href="/">console.log(Emi)</Link>
        </h1>
        <Nav />
      </div>
    </header>
  );
};
