import type { NextApiRequest, NextApiResponse } from "next";

const HandleInstagram = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const count = "9"; //画像取得数
    const id = process.env.INSTAGRAM_ID; //InstagramビジネスアカウントID
    const token = process.env.INSTAGRAM_TOKEN; // アクセストークン3
    const data = await fetch(
      `https://graph.facebook.com/v6.0/${id}?fields=name%2Cmedia.limit(${count})%7Bcaption%2Cmedia_url%2Cthumbnail_url%2Cpermalink%7D&access_token=${token}`
    );
    const json = await data.json();

    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
};

export default HandleInstagram;
