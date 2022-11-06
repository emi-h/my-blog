import * as cheerio from "cheerio";

export const renderToc = (body) => {
  const $ = cheerio.load(body);
  const headings = $("h2").toArray();
  const toc = headings.map((data) => ({
    id: data.attribs.id,
    text: data.children[0].data,
  }));

  return toc;
};
