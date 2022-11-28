import { GetServerSidePropsContext } from "next";
import RSS from "rss";
import { client } from "src/libs/microCMSClient";
import { Blog } from "src/types/Blog";

async function generateFeedXml() {
  const feed = new RSS({
    title: "console.log(emi);のフィード",
    description: "console.log(emi);のフィード",
    feed_url: "https://3things.work/feed",
    language: "ja",
    site_url: "https://3things.work",
  });

  const { contents } = await client.get({
    endpoint: "blog",
  });

  contents?.forEach((post: Blog) => {
    feed.item({
      title: post.title,
      date: new Date(post.createdAt),
      description: post.content_excerpt,
      url: `https://3things.work/blog/${post.category.id}/${post.id}`, // 適宜修正してください
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
