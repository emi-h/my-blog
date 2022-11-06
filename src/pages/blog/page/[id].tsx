import dayjs from "dayjs";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Pagination } from "src/components/Pagination/Pagination";
import { client } from "src/libs/microCMSClient";
import styles from "src/styles/Home.module.css";
import { Blog } from "src/types/Blog";

type Props = MicroCMSListResponse<Blog>;

const PER_PAGE = 6;

const BlogPageId: FC<{ blogData: Props; totalCount: number }> = ({
  blogData,
  totalCount,
}) => {
  return (
    <div className={styles.inner}>
      <div className={styles.colums}>
        <div className={styles.content}>
          <ul className={styles.grid}>
            {blogData.contents.map((data) => {
              return (
                <li className={styles.card} key={data.id}>
                  <Link href={`/blog/${data.id}`}>
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
          <Pagination totalCount={totalCount} />
        </div>
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

  const id = Number(context.params.id);

  const data = await client.getList<Blog>({
    endpoint: "blog",
    queries: { limit: 5, offset: (id - 1) * 5 },
  });

  return {
    props: {
      blogData: data,
      totalCount: data.totalCount,
    },
  };
};
