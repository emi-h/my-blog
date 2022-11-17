import { GetServerSidePropsContext } from "next";
import { client } from "src/libs/microCMSClient";
import { Blog } from "src/types/Blog";

async function generateSitemapXml() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const posts = await client.getList<Blog>({
    endpoint: "blog",
    queries: { limit: 99999 },
  });

  const appHost = "https://3things.work/";

  posts.contents.forEach((post) => {
    xml += `
          <url>
            <loc>${appHost}${post.id}</loc>
            <lastmod>${post.revisedAt}</lastmod>
            <changefreq>weekly</changefreq>
          </url>
        `;
  });

  xml += `</urlset>`;
  return xml;
}

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml();

  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24hcache
  res.setHeader("Content-Type", "text/xml");
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
