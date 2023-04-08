import { NextApiRequest, NextApiResponse } from "next";

/**
 * @author Shuvi Dola
 */
export interface Post {
  _id: string;
  title: string;
  content: string;
}

export type Handler = (
  req: NextApiRequest,
  resp: NextApiResponse
) => Promise<void>;
