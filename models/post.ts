import type { Post } from "@/lib/types";
import { Schema, model, models } from "mongoose";

const postSchema = new Schema<Post>({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
}, {autoCreate: true});

export const PostModel = models.Post || model('Post', postSchema);
