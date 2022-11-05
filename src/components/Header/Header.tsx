import Link from "next/link";
import React from "react";
import styles from "src/components/Header/Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          <Link href="/">Emi&apos;s blog</Link>
        </h1>
      </div>
    </header>
  );
};
