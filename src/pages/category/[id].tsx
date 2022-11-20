import dayjs from "dayjs";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { Breadcrumb } from "src/components/Breadcrumb/Breadcrumb";
import { CommonMeta } from "src/components/CommonMeta/CommonMeta";
import { Sidebar } from "src/components/Sidebar/Sidebar";
import { client } from "src/libs/microCMSClient";
import styles from "src/styles/Category.module.css";
import { Blog } from "src/types/Blog";
import { Category, CategoryData } from "src/types/Category";

type Props = {
  blogData: MicroCMSListResponse<Blog>;
  categoryData: MicroCMSListResponse<Category>;
};

const CategoryId: NextPage<Props> = ({ blogData, categoryData }) => {
  const posts = blogData.contents;

  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (posts.length === 0) {
    return (
      <>
        <CommonMeta title="Category" />
        <div className={styles.inner}>
          <Breadcrumb pageTitle="カテゴリー" />
          <div className={styles.colums}>
            <div className={styles.content}>
              <div>記事がありません</div>
            </div>
            <Sidebar categoryData={categoryData.contents} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <CommonMeta
        title={`${posts[0].category.category}カテゴリー`}
        description={`${posts[0].category.category}カテゴリー記事`}
      />
      <div className={styles.inner}>
        <Breadcrumb pageTitle={`カテゴリー：${posts[0].category.category}`} />
        <div className={styles.colums}>
          <div className={styles.content}>
            <h2>カテゴリー記事一覧：{posts[0].category.category}</h2>
            <p className={styles.colorGray}>記事数：{blogData.totalCount}件</p>
            <ul className={styles.categoryAtricleList}>
              {posts.map((blog) => (
                <li key={blog.id}>
                  <Link href={`/blog/${blog.id}`}>
                    <h3>{blog.title}</h3>
                    <p className={styles.content_excerpt}>
                      {blog.content_excerpt}
                    </p>
                    <p className={styles.date}>
                      <span>
                        最終更新:&nbsp;&nbsp;
                        {dayjs(blog.revisedAt).format("YYYY.MM.DD")}
                      </span>
                      <span>
                        公開:&nbsp;&nbsp;
                        {dayjs(blog.publishedAt).format("YYYY.MM.DD")}
                      </span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Sidebar categoryData={categoryData.contents} />
        </div>
      </div>
    </>
  );
};

export default CategoryId;

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  // カテゴリー情報を取ってくる
  const data = await client.getList<CategoryData>({ endpoint: "category" });

  // カテゴリー情報からIDのみ取り出してパスの配列を作る
  // idだけでなくパスを返すこと
  const paths = data.contents.map((content) => `/category/${content.id}`);

  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return {
      notFound: true,
    };
  }
  const id = context.params.id;
  const blogData = await client.getList<Blog>({
    endpoint: "blog",
    queries: { filters: `category[equals]${id}`, limit: 20 },
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
