import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "src/components/Footer/Footer";
import { Header } from "src/components/Header/Header";
import { client } from "src/libs/microCMSClient";
import styles from "src/styles/Home.module.css";
import { Blog } from "src/types/blog";

type Props = MicroCMSListResponse<Blog>;
export const Home: NextPage<{ blogData: Props }> = ({ blogData }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Emi&apos;s blog | Top</title>
        <meta name="description" content="Emi's Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.header}>
              <h2>blog</h2>
              <p>記事合計：{blogData.totalCount}件</p>
            </div>
            <ul className={styles.grid}>
              {blogData.contents.map((data) => {
                return (
                  <li className={styles.card} key={data.id}>
                    <Link href={"/"}>
                      <div className={styles.card_img}>
                        <Image
                          src="/eric.png"
                          alt="Picture of the author"
                          fill
                          sizes="100%"
                        />
                      </div>
                      <div className={styles.card_content}>
                        <p className={styles.card_categories}>
                          <span>{"カテゴリ"}</span>
                        </p>
                        <p className={styles.card_title}>{data.title}</p>
                        <time dateTime={""} className={styles.card_date}>
                          {data.createdAt}
                        </time>
                      </div>
                      <p className={styles.card_tags}>
                        <span>タグ</span>
                        <span>タグ</span>
                        <span>タグ</span>
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <aside>サイドバー</aside>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const blogData = await client.getList<Blog>({ endpoint: "blog" });
  return {
    props: {
      blogData,
    },
  };
};
