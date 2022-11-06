import Link from "next/link";
import { FC } from "react";
import styles from "src/components/Pagination/Pagination.module.css";

export const Pagination: FC<{ totalCount: number }> = ({ totalCount }) => {
  //   console.log(page);

  const PER_PAGE = 6;
  // ページネーションのリスト数の配列を作る関数
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className={styles.list}>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li
          key={index}
          //     className={number === current ? "styles.current" : null}
        >
          <Link href={`/blog/page/${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  );
};
