import Link from "next/link";
import { FC } from "react";
import styles from "src/components/Button/Button.module.css";

export const Button: FC<{ href: string; text: string }> = ({ href, text }) => {
  return (
    <Link href={href} className={styles.btn}>
      {text}
    </Link>
  );
};
