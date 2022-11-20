import Link from "next/link";
import React from "react";
import styles from "src/components/Footer/Footer.module.css";
import { footerNavList } from "src/data/navdata";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.navArea}>
          <ul className={styles.nav}>
            {footerNavList.map((list) => {
              return (
                <li key={list.pageName}>
                  <Link href={list.href}>{list.pageName}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <p className={styles.copyright}>Copyright © emi All rights reserved.</p>
    </footer>
  );
};
