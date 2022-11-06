import dayjs from "dayjs";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "src/components/Footer/Footer";
import { Header } from "src/components/Header/Header";
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
  return (
    <div className={styles.container}>
      <Head>
        <title>Emi&apos;s blog | Top</title>
        <meta name="description" content="Emi's Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <h2>blog</h2>
            <p>記事合計：{blogData.totalCount}件</p>
          </div>
          <div className={styles.colums}>
            <div className={styles.content}>
              <ul className={styles.grid}>
                {blogData.contents.map((data) => {
                  return (
                    <li className={styles.card} key={data.id}>
                      <Link href={"/"}>
                        <div className={styles.card_img}>
                          <Image
                            src={data.portfolio_img.url}
                            alt="Picture of the author"
                            fill
                            sizes="100%"
                          />
                        </div>
                        <div className={styles.card_description}>
                          <div className={styles.card_content}>
                            <p className={styles.card_categories}>
                              <span>{data.category.category}</span>
                            </p>
                            <p className={styles.card_title}>{data.title}</p>
                            <time
                              dateTime={data.createdAt}
                              className={styles.card_date}
                            >
                              {dayjs(data.createdAt).format("YYYY/MM/DD")}
                            </time>
                          </div>
                          {/* <p className={styles.card_tags}>
                            <span>タグ</span>
                            <span>タグ</span>
                            <span>タグ</span>
                          </p> */}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Sidebar categoryData={categoryData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // ブログコンテンツの取得
  const blogData = await client.getList<Blog>({ endpoint: "blog" });
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
