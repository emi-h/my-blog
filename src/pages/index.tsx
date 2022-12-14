import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { BlogList } from "src/components/BlogList/BlogList";
import { Button } from "src/components/Button/Button";
import { CommonMeta } from "src/components/CommonMeta/CommonMeta";
import { Sidebar } from "src/components/Sidebar/Sidebar";
import { client } from "src/libs/microCMSClient";
import styles from "src/styles/Home.module.css";
import { Blog } from "src/types/Blog";
import { Category, CategoryData } from "src/types/Category";

type Props = {
  blogData: MicroCMSListResponse<Blog>;
  categoryData: MicroCMSListResponse<Category>;
};

const Home: NextPage<Props> = ({ blogData, categoryData }) => {
  return (
    <>
      <CommonMeta
        title="Home"
        description="フロントエンドエンジニアemiのサイトトップページ"
      />
      <div className={styles.inner}>
        <div className={styles.colums}>
          <div className={styles.content}>
            <section className={styles.introSection}>
              <h2>このサイトについて</h2>
              <p>Next.js(TypeScript)とmicroCMSを使用して制作しました。</p>
              <p>
                Githubにソースを公開していますので、よければのぞいてみてください:)
              </p>
              <p>
                <Link
                  className={styles.Linkunderline}
                  href="https://github.com/emi-h/my-blog"
                >
                  ソースコードはこちら
                </Link>
              </p>
            </section>
            <section>
              <div className={styles.header}>
                <h2>Blog記事</h2>
              </div>
              <BlogList blogData={blogData} />
              <div className={styles.btnWrap}>
                <Button text="ブログ一覧を見る" href="blog/page/1" />
              </div>
            </section>
          </div>
          <Sidebar categoryData={categoryData.contents} />
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
  const categoryData = await client.getList<CategoryData>({
    endpoint: "category",
  });

  return {
    props: {
      blogData,
      categoryData,
    },
  };
};
