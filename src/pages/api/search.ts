import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "src/libs/microCMSClient";
import { Blog } from "src/types/Blog";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await client.getList<Blog>({
    endpoint: "blog",
    queries: { q: req.body.q },
  });
  res.status(200).json(data);
};

export default Handler;
