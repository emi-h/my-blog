import { MicroCMSListResponse } from "microcms-js-sdk";
import { FC } from "react";
import { BlogList } from "src/components/BlogList/BlogList";
import styles from "src/components/BlogPageContent/BlogPageContent.module.css";
import { Pagination } from "src/components/Pagination/Pagination";
import { Blog } from "src/types/Blog";

type Props = {
  title?: string;
  allNumber?: number;
  allPages?: number;
  blogData: MicroCMSListResponse<Blog>;
  currentPage?: number;
  totalCount?: number;
};

export const BlogPageContent: FC<Props> = ({
  title,
  allNumber,
  allPages,
  blogData,
  currentPage,
  totalCount,
}) => {
  return (
    <div className={styles.content}>
      {currentPage ? (
        <p className={styles.colorGray}>
          {currentPage}ページ&nbsp;&nbsp;/&nbsp;&nbsp;
          {allPages}ページ中
        </p>
      ) : null}
      {allNumber ? <p>検索結果：{blogData.contents.length}件</p> : null}
      <h2>{title}一覧</h2>
      <BlogList blogData={blogData} />
      {totalCount && currentPage ? (
        <Pagination totalCount={totalCount} currentPage={currentPage} />
      ) : null}
    </div>
  );
};
