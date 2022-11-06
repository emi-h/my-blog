import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { client } from "src/libs/microCMSClient";
import styles from "src/styles/Home.module.css";
import { Blog } from "src/types/Blog";
import { CategoryData } from "src/types/Category";

type Props = MicroCMSListResponse<Blog>;

const CategoryId: NextPage<Props> = (props) => {
  const blog = props.contents;
  // console.log(blog);

  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (blog.length === 0) {
    return (
      <>
        <h2>カテゴリー記事一覧：{blog[0].category.category}</h2>
        <div>ブログコンテンツがありません</div>;
      </>
    );
  }
  return (
    <div className={styles.inner}>
      <h2>カテゴリー記事一覧：{blog[0].category.category}</h2>
      <ul className={styles.categoryAtricleList}>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
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

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  context
) => {
  if (!context.params) {
    return {
      notFound: true,
    };
  }
  const id = context.params.id;
  const data = await client.getList<Blog>({
    endpoint: "blog",
    queries: { filters: `category[equals]${id}` },
  });
  return {
    props: data,
  };
};
