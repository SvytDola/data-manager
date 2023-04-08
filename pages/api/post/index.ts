import { NextApiRequest, NextApiResponse } from "next";

import { PostModel } from "@/models";
import { connectToMongoDatabase } from "@/lib/database";
import { Handler } from "@/lib/types";

async function handler(req: NextApiRequest, resp: NextApiResponse) {
  await connectToMongoDatabase();

  const handle = new Map<string, Handler>()
    .set("GET", async (req, resp) => {
      const posts = await PostModel.find({});
      resp.status(200).json(posts);
    })
    .set("POST", async (req, resp) => {
      const post = await PostModel.create(req.body);
      resp.status(201).json(post);
    });

  const method = handle.get(req.method!);

  if (method === undefined) {
    resp.status(400).json({ message: "No response for this request." });
    return;
  }

  await method(req, resp);
}

export default handler;
