import 'highlight.js/styles/hybrid.css';

import dayjs from "dayjs";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Breadcrumb } from "src/components/Breadcrumb/Breadcrumb";
import { TableOfContents } from "src/components/TableOfContents/TableOfContents";
import { client } from "src/libs/microCMSClient";
import { renderHighlightedBody, renderToc } from "src/libs/render-toc";
import styles from "src/styles/Home.module.css";
import { Blog } from "src/types/Blog";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const Post: NextPage<Props> = (props) => {
  
  // get the index info
  const toc = renderToc(props.content);
  const highlightedBody =renderHighlightedBody(props.content)

  return (
    <>
      <Head>
        <title>{props.title} | console.log(emi);</title>
        <meta name="description" content={props.content_excerpt} />
      </Head>
      <div className={styles.inner}>
        <Breadcrumb
          blogPageInfo={{
            blogTitle: props.title,
            categoryId: props.category.id,
            categoryName: props.category.category,
          }}
        />
        <article>
          <h1>{props.title}</h1>
          <p>
            <span className={styles.category}>
              <span>{props.category.category}</span>
            </span>
            <span className={styles.date}>
              <span>
                最終更新：{dayjs(props.revisedAt).format("YYYY.MM.DD")}
              </span>
              <span>公開：{dayjs(props.publishedAt).format("YYYY.MM.DD")}</span>
            </span>
          </p>
          {props.toc_visible && <TableOfContents toc={toc} />}
          <div
            className={styles.blog_post}
            dangerouslySetInnerHTML={{ __html: highlightedBody }}
          />
        </article>
      </div>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList<Blog>({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/${content.id}`);

  // falback:falseでは動かない
  return { fallback: "blocking", paths };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  context
) => {
  if (!context.params) {
    return {
      notFound: true,
    };
  }
  const data = await client.getListDetail<Blog>({
    contentId: context.params.id,
    endpoint: "blog",
  });
    
  return {
    props: data,
    revalidate: 10,
  };
};
