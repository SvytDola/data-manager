import { NextApiRequest, NextApiResponse } from "next";

import { PostModel } from "@/models";
import { Handler } from "@/lib/types";
import { connectToMongoDatabase } from "@/lib/database";

async function handler(req: NextApiRequest, resp: NextApiResponse) {
  await connectToMongoDatabase();

  const id = req.query.id as string;

  const handle = new Map<string, Handler>()
    .set("GET", async (req, resp) => {
      const post = await PostModel.findById(id);
      if (post === null) {
        resp.status(404).json({ message: "Post not found." });
        return;
      }
      resp.status(200).json(post);
    })
    .set("PUT", async (req, resp) => {
      const post = await PostModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      resp.status(200).json(post);
    })
    .set("DELETE", async (req, resp) => {
      const post = await PostModel.findByIdAndRemove(id);
      resp.status(204).json(post);
    });

  const method = handle.get(req.method!);

  if (method === undefined) {
    resp.status(400).json({ message: "No response for this request." });
    return;
  }

  await method(req, resp);
}

export default handler;
