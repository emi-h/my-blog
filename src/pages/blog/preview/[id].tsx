import dayjs from "dayjs";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { TableOfContents } from "src/components/TableOfContents/TableOfContents";
import { client } from "src/libs/microCMSClient";
import { renderToc } from "src/libs/render-toc";
import styles from "src/styles/Home.module.css";
import { Blog } from "src/types/Blog";

type Props = Blog & MicroCMSContentId & MicroCMSDate;
const PreviewPage: NextPage<Props> = (props) => {
  // get the index info
  const toc = renderToc(props.content);

  return (
    <>
      <p className={styles.preview}>これはプレビューです</p>
      <article>
        <h1>{props.title}</h1>
        <p>
          <span className={styles.category}>
            <span>{props.category.category}</span>
          </span>
          <span className={styles.date}>
            <span>最終更新：{dayjs(props.revisedAt).format("YYYY.MM.DD")}</span>
            <span>公開：{dayjs(props.publishedAt).format("YYYY.MM.DD")}</span>
          </span>
        </p>
        {props.toc_visible && <TableOfContents toc={toc} />}
        <div
          className={styles.blog_post}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </article>
    </>
  );
};

export default PreviewPage;

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList<Blog>({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/preview/${content.id}`);

  return { fallback: true, paths };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params, previewData } = context;

  if (!params?.id) {
    throw new Error("Error: ID not found");
  }

  /* draftKeyの存在をチェック */
  type Draft = {
    draftKey: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isDraft = (arg: any): arg is Draft => {
    if (!arg?.draftKey) {
      return false;
    }
    return typeof arg.draftKey === "string";
  };

  const slug = String(params.id);
  const draftKey = isDraft(previewData)
    ? { draftKey: previewData.draftKey }
    : {};

  /* クエリー付リクエスト */
  try {
    const data = await client.getListDetail<Blog>({
      contentId: slug,
      endpoint: "blog",
      queries: draftKey,
    });

    return {
      props: data,
    };
  } catch (e) {
    return { props: { notFound: false } };
  }
};
