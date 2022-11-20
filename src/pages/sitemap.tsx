import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { FC } from "react";
import { CommonMeta } from "src/components/CommonMeta/CommonMeta";
import { footerNavList, headerNavList } from "src/data/navdata";
import { client } from "src/libs/microCMSClient";
import styles from "src/styles/Sitemap.module.css";
import { Blog } from "src/types/Blog";
import { CategoryData } from "src/types/Category";

const sitemap: NextPage<{
  blogData: MicroCMSListResponse<Blog>;
  categoryData: CategoryData;
}> = ({ blogData, categoryData }) => {
  return (
    <>
      <CommonMeta
        title="Sitemap"
        description="フロントエンドエンジニアemiのサイトマップ"
      />
      <div className={styles.inner}>
        <h2 className={styles.title}>サイトマップ</h2>
        <div className={styles.colums}>
          <div className={styles.content}>
            {categoryData.contents.map((cdata) => (
              <>
                <ul key={cdata.publishedAt} className={styles.list}>
                  <li>
                    <Link href={`/category/${cdata.id}`}>{cdata.category}</Link>
                  </li>
                  <ul className={styles.titleList}>
                    {blogData.contents.map((bdata) => (
                      <Component key={bdata.id} cdata={cdata} bdata={bdata} />
                    ))}
                  </ul>
                </ul>
              </>
            ))}
            <ul className={styles.list}>
              {headerNavList.map((list) => {
                return (
                  <li key={list.pageName}>
                    <Link href={list.href}>{list.pageName}</Link>
                  </li>
                );
              })}
            </ul>
            <ul className={styles.list}>
              {footerNavList.map((list) => {
                return (
                  <li key={list.pageName}>
                    <Link href={list.href}>{list.pageName}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

type Props = {
  bdata: { id: string; title: string; category: { id: string } };
  cdata: { id: string };
};
export const Component: FC<Props> = ({ bdata, cdata }) => {
  if (cdata.id === bdata.category.id) {
    return (
      <li key={bdata.id}>
        <Link href={`/blog/${bdata.id}`}>{bdata.title}</Link>
      </li>
    );
  }
  return null;
};

export default sitemap;

export const getStaticProps: GetStaticProps = async () => {
  // ブログコンテンツの取得
  const blogData = await client.getList<Blog>({
    endpoint: "blog",
    queries: { limit: 999, offset: 0 },
  });
  // カテゴリーコンテンツの取得
  const categoryData = await client.get<CategoryData>({
    endpoint: "category",
  });

  return {
    props: {
      blogData: blogData,
      categoryData: categoryData,
    },
  };
};
