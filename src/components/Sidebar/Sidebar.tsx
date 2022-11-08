import Link from "next/link";
import { FC } from "react";
import styles from "src/components/Sidebar/Sidebar.module.css";
import { Category } from "src/types/Category";

import { SearchInput } from "../SearchInput/SearchInput";

export const Sidebar: FC<{ categoryData: Category[] }> = ({ categoryData }) => {
  return (
    <aside className={styles.aside}>
      <div className={styles.search}>
        <p>サイト内検索＜追加中...＞</p>
        <SearchInput />
      </div>
      <div>
        <h2 className={styles.category_title}>カテゴリー</h2>
        <ul className={styles.category_list}>
          {categoryData.map((data) => {
            return (
              <li key={data.id}>
                <Link href={`/category/${data.id}`}>{data.category}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
