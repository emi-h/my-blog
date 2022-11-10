import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { FC, useState } from "react";
import { BlogPageContent } from "src/components/BlogPageContent/BlogPageContent";
import { SearchInput } from "src/components/SearchInput/SearchInput";
import { Sidebar } from "src/components/Sidebar/Sidebar";
import { client } from "src/libs/microCMSClient";
import styles from "src/styles/Home.module.css";
import { Blog } from "src/types/Blog";
import { Category, CategoryData } from "src/types/Category";

type Props = MicroCMSListResponse<Blog>;

const BlogPageId: FC<{
  blogData: Props;
  categoryData: Category[];
  currentPage: number;
  totalCount: number;
}> = ({ blogData, categoryData, currentPage, totalCount }) => {
  const [searchData, setSearchData] = useState<MicroCMSListResponse<Blog>>();

  // 全体のページ数
  const allPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <>
      <Head>
        <title>ブログ記事一覧 | console.log(emi);</title>
        <meta name="description" content="ブログ記事一覧" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.inner}>
        <div className={styles.colums}>
          <div className={styles.content}>
            <div className={styles.search}>
              <SearchInput setSearchData={setSearchData} />
            </div>
            {searchData ? (
              <BlogPageContent
                blogData={searchData}
                totalCount={totalCount}
                // currentPage={currentPage}
                allPages={allPages}
                title="検索結果"
                allNumber={searchData.contents.length}
              />
            ) : (
              <BlogPageContent
                blogData={blogData}
                totalCount={totalCount}
                currentPage={currentPage}
                allPages={allPages}
                title="ブログ記事"
              />
            )}
          </div>
          <Sidebar categoryData={categoryData} />
        </div>
      </div>
    </>
  );
};

export default BlogPageId;

const PER_PAGE = 9;

export const getStaticPaths: GetStaticPaths = async () => {
  const repos = await client.getList<Blog>({ endpoint: "blog" });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageNumbers = [];

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
      categoryData: categoryData.contents,
      currentPage: pageId,
      totalCount: data.totalCount,
    },
  };
};
