import { GetServerSidePropsContext } from "next";
import RSS from "rss";
import { client } from "src/libs/microCMSClient";
import { Blog } from "src/types/Blog";

async function generateFeedXml() {
  const SITE_URL = "https://3things.work";
  const feed = new RSS({
    title: "console.log(emi);",
    description: "console.log(emi);のフィード",
    feed_url: `${SITE_URL}+/feed`,
    language: "ja",
    site_url: SITE_URL,
  });

  const { contents } = await client.get({
    endpoint: "blog",
  });

  contents?.forEach((post: Blog) => {
    feed.item({
      title: post.title,
      date: new Date(post.createdAt),
      description: post.content_excerpt,
      url: `${SITE_URL}/blog/${post.id}`, // 適宜修正
    });
  });

  return feed.xml();
}

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const xml = await generateFeedXml();

  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.setHeader("Content-Type", "text/xml");
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
