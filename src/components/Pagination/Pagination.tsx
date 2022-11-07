import Link from "next/link";
import { FC } from "react";
import styles from "src/components/Pagination/Pagination.module.css";

export const Pagination: FC<{ currentPage: number; totalCount: number }> = ({
  currentPage,
  totalCount,
}) => {
  const PER_PAGE = 6;
  // ページネーションのリスト数の配列を作る関数
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className={styles.list}>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li
          key={index}
          className={currentPage == number ? styles.currentPage : undefined}
        >
          <Link href={`/blog/page/${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  );
};
