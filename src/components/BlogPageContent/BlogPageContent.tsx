import { MicroCMSListResponse } from "microcms-js-sdk";
import { FC } from "react";
import { BlogList } from "src/components/BlogList/BlogList";
import styles from "src/components/BlogPageContent/BlogPageContent.module.css";
import { Pagination } from "src/components/Pagination/Pagination";
import { Blog } from "src/types/Blog";

type Props = {
  title?: string;
  allNumber?: number;
  blogData: MicroCMSListResponse<Blog>;
  currentPage?: number;
  totalArticleCount?: number;
  totalPages?: number;
};

export const BlogPageContent: FC<Props> = ({
  title,
  allNumber,
  blogData,
  currentPage,
  totalArticleCount,
  totalPages,
}) => {
  return (
    <div className={styles.content}>
      {currentPage ? (
        <p className={styles.colorGray}>
          {currentPage}ページ&nbsp;&nbsp;/&nbsp;&nbsp;
          {totalPages}ページ中
        </p>
      ) : null}
      {allNumber ? <p>検索結果：{blogData.contents.length}件</p> : null}
      <h2>{title}一覧</h2>
      <BlogList blogData={blogData} />
      {totalArticleCount && currentPage ? (
        <Pagination
          totalArticleCount={totalArticleCount}
          currentPage={currentPage}
        />
      ) : null}
    </div>
  );
};
