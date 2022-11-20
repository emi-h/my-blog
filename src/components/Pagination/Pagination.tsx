import Link from "next/link";
import { FC } from "react";
import styles from "src/components/Pagination/Pagination.module.css";

export const Pagination: FC<{
  currentPage: number;
  totalArticleCount: number;
}> = ({ currentPage, totalArticleCount }) => {
  const PER_PAGE = 9; // 9記事/1p
  // ページネーションのリスト数の配列を作る関数[1,2,....]
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className={styles.list}>
      {range(1, Math.ceil(totalArticleCount / PER_PAGE)).map(
        (number, index) => (
          <li
            key={index}
            className={currentPage == number ? styles.currentPage : undefined}
          >
            <Link href={`/blog/page/${number}`}>{number}</Link>
          </li>
        )
      )}
    </ul>
  );
};
