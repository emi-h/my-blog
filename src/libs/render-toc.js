import * as cheerio from "cheerio";
import hljs from "highlight.js";

export const renderToc = (body) => {
  const $ = cheerio.load(body);
  const headings = $("h2").toArray();
  const toc = headings.map((data) => ({
    id: data.attribs.id,
    text: data.children[0].data,
  }));

  return toc;
};
export const renderHighlightedBody = (body) => {
  const $ = cheerio.load(body);

  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass("hljs")
  })

  return $.html();
};
