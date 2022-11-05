import Link from "next/link";
import React from "react";
import styles from "src/components/Header/Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/">Emi</Link>
      </h1>
    </header>
  );
};
