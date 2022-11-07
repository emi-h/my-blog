import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { BlogList } from "src/components/BlogList/BlogList";
import { Pagination } from "src/components/Pagination/Pagination";
import { Sidebar } from "src/components/Sidebar/Sidebar";
import { client } from "src/libs/microCMSClient";
import styles from "src/styles/Home.module.css";
import { Blog } from "src/types/Blog";
import { Category, CategoryData } from "src/types/Category";

type Props = MicroCMSListResponse<Blog>;

const PER_PAGE = 9;

const BlogPageId: FC<{
  blogData: Props;
  categoryData: Category[];
  currentPage: number;
  totalCount: number;
}> = ({ blogData, categoryData, currentPage, totalCount }) => {
  return (
    <div className={styles.inner}>
      <div className={styles.colums}>
        <div className={styles.content}>
          <h2>ブログ記事一覧</h2>
          <BlogList blogData={blogData} />
          <Pagination totalCount={totalCount} currentPage={currentPage} />
        </div>
        <Sidebar categoryData={categoryData} />
      </div>
    </div>
  );
};

export default BlogPageId;

export const getStaticPaths: GetStaticPaths = async () => {
  const repos = await client.getList<Blog>({ endpoint: "blog" });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageNumbers = [];

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  );

  return { fallback: false, paths };
};

// データを取得
export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return {
      notFound: true,
    };
  }

  const pageId = Number(context.params.id);

  const data = await client.getList<Blog>({
    endpoint: "blog",
    queries: { limit: PER_PAGE, offset: (pageId - 1) * 5 },
  });

  // カテゴリーコンテンツの取得
  const categoryData = await client.get<CategoryData>({
    endpoint: "category",
  });

  return {
    props: {
      blogData: data,
      categoryData: categoryData.contents,
      currentPage: pageId,
      totalCount: data.totalCount,
    },
  };
};
