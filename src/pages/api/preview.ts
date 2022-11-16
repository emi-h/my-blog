import { NextApiRequest, NextApiResponse } from "next";
import { client } from "src/libs/microCMSClient";

//ブラウザから `/api/preview` にアクセスするとこの関数が起動
const Preview = async (req: NextApiRequest, res: NextApiResponse) => {
  // クエリーからキーとスラッグを取得
  const { draftKey, slug } = req.query;

  // キーやスラッグがなければ、404
  if (!req.query.slug) {
    res.status(404).end();
    return;
  }
  // type check
  if (typeof draftKey !== "string" || typeof slug !== "string") {
    res.status(404).end();
    return;
  }
  // キーやスラッグを利用してデータ取得
  const data = await client.get({
    contentId: slug,
    endpoint: "blog",
    queries: {
      draftKey,
    },
  });

  // データがなければ、エラーメッセージを返却
  if (!data) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  //
  res.setPreviewData({
    draftKey: req.query.draftKey,
    slug: data.id,
  });
  res.writeHead(307, { Location: `/blog/preview/${data.id}` });

  res.end("Preview mode enabled");
};

export default Preview;
