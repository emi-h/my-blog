import dayjs from "dayjs";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { TableOfContents } from "src/components/TableOfContents/TableOfContents";
import { client } from "src/libs/microCMSClient";
import { renderToc } from "src/libs/render-toc";
import styles from "src/styles/Home.module.css";
import { Blog } from "src/types/Blog";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const Post: NextPage<Props> = (props) => {
  // get the index info
  const toc = renderToc(props.content);

  return (
    <>
      <Head>
        <title>Emi H | {props.title}</title>
        <meta name="description" content="Emi H's portfolio detail" />
      </Head>
      <article className={styles.blog_post}>
        <div>
          <h1>{props.title}</h1>
          <p>
            <span className={styles.category}>
              <span>{props.category.category}</span>
            </span>
            <span>{dayjs(props.createdAt).format("YYYY/MM/DD")}</span>
          </p>
          {props.toc_visible && <TableOfContents toc={toc} />}
          <div dangerouslySetInnerHTML={{ __html: props.content }} />
        </div>
      </article>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList<Blog>({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/${content.id}`);

  return { fallback: false, paths };
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
  };
};
