import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { BlogList } from "src/components/BlogList/BlogList";
import { Pagination } from "src/components/Pagination/Pagination";
import { Sidebar } from "src/components/Sidebar/Sidebar";
import { client } from "src/libs/microCMSClient";
import styles from "src/styles/Home.module.css";
import { Blog } from "src/types/Blog";
import { Category, CategoryData } from "src/types/Category";

type Props = MicroCMSListResponse<Blog>;

const Home: NextPage<{ blogData: Props; categoryData: Category[] }> = ({
  blogData,
  categoryData,
}) => {
  // console.log(blogData);

  return (
    <>
      <Head>
        <title>Emi&apos;s blog | Top</title>
        <meta name="description" content="Emi's Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2>blog</h2>
          <p>記事合計：{blogData.totalCount}件</p>
        </div>
        <div className={styles.colums}>
          <div className={styles.content}>
            <BlogList blogData={blogData} />
            <Pagination totalCount={blogData.totalCount} />
          </div>
          <Sidebar categoryData={categoryData} />
        </div>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // ブログコンテンツの取得
  const blogData = await client.getList<Blog>({
    endpoint: "blog",
    queries: { limit: 6, offset: 0 },
  });
  // カテゴリーコンテンツの取得
  const categoryData = await client.get<CategoryData>({
    endpoint: "category",
  });

  return {
    props: {
      blogData,
      categoryData: categoryData.contents,
    },
  };
};
