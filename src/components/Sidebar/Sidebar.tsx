import Link from "next/link";
import { FC } from "react";
import styles from "src/components/Sidebar/Sidebar.module.css";
import { Category } from "src/types/Category";

export const Sidebar: FC<{ categoryData: Category[] }> = ({ categoryData }) => {
  // console.log(categoryData);

  return (
    <aside className={styles.aside}>
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
