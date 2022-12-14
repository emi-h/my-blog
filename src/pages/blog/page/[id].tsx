import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC, useState } from "react";
import { BlogPageContent } from "src/components/BlogPageContent/BlogPageContent";
import { Breadcrumb } from "src/components/Breadcrumb/Breadcrumb";
import { CommonMeta } from "src/components/CommonMeta/CommonMeta";
import { SearchInput } from "src/components/SearchInput/SearchInput";
import { Sidebar } from "src/components/Sidebar/Sidebar";
import { client } from "src/libs/microCMSClient";
import styles from "src/styles/Blog.module.css";
import { Blog } from "src/types/Blog";
import { Category, CategoryData } from "src/types/Category";

type Props = {
  blogData: MicroCMSListResponse<Blog>;
  categoryData: MicroCMSListResponse<Category>;
  currentPage: number;
  totalArticleCount: number;
};

const BlogPageId: FC<Props> = ({
  blogData,
  categoryData,
  currentPage,
  totalArticleCount,
}) => {
  const [searchData, setSearchData] = useState<MicroCMSListResponse<Blog>>();

  // 全体のページ数
  const totalPages = Math.ceil(totalArticleCount / PER_PAGE);

  return (
    <>
      <CommonMeta title="ブログ記事一覧" description="ブログ記事一覧です。" />
      <div className={styles.inner}>
        <Breadcrumb pageTitle="Blog" />
        <div className={styles.colums}>
          <div className={styles.content}>
            <div className={styles.search}>
              <SearchInput setSearchData={setSearchData} />
            </div>
            {searchData ? (
              <BlogPageContent
                blogData={searchData}
                totalArticleCount={totalArticleCount}
                // currentPage={currentPage}
                totalPages={totalPages}
                title="検索結果"
                allNumber={searchData.contents.length}
              />
            ) : (
              <BlogPageContent
                blogData={blogData}
                totalArticleCount={totalArticleCount}
                currentPage={currentPage}
                totalPages={totalPages}
                title="ブログ記事"
              />
            )}
          </div>
          <Sidebar categoryData={categoryData.contents} />
        </div>
      </div>
    </>
  );
};

export default BlogPageId;

const PER_PAGE = 9;

export const getStaticPaths: GetStaticPaths = async () => {
  const repos = await client.getList<Blog>({ endpoint: "blog" });

  // rangeの引数に(start, end)を与えて、その値を元に配列を作成する関数
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  // ページ番号の配列作成
  // The Math.ceil() function always rounds up and returns the smaller integer greater than or equal to a given number.
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

  // 現在いるページの番号
  const pageId = context.params.id;

  // offsetは何件目から取得するかを指定します。デフォルト値は0です。
  // limitは取得件数を指定します。デフォルト値は10です。
  const data = await client.getList<Blog>({
    endpoint: "blog",
    queries: { limit: 9, offset: (Number(pageId) - 1) * 9 },
  });

  // カテゴリーコンテンツの取得
  const categoryData = await client.get<CategoryData>({
    endpoint: "category",
  });

  return {
    props: {
      blogData: data,
      categoryData: categoryData,
      currentPage: pageId,
      totalArticleCount: data.totalCount,
    },
  };
};
