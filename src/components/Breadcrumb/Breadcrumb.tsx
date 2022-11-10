import Link from "next/link";
import { FC } from "react";
import styles from "src/components/Breadcrumb/Breadcrumb.module.css";

type Props = {
  blogPageInfo?: {
    blogTitle: string;
    categoryId: string;
    categoryName: string;
  };
  pageTitle?: string;
};
export const Breadcrumb: FC<Props> = ({ blogPageInfo, pageTitle }) => {
  return (
    <ol className={styles.breadcrumb}>
      <li>
        <Link href="/">Home</Link>
      </li>
      {blogPageInfo ? (
        <>
          <li>
            <Link href={`/category/${blogPageInfo.categoryId}`}>カテゴリ</Link>
          </li>
          <li>{blogPageInfo.blogTitle}</li>
        </>
      ) : null}
      {pageTitle ? <li>{pageTitle}</li> : null}
    </ol>
  );
};
