import { connect  } from "mongoose";

/**
 * @author Shuvi Dola
 */
export async function connectToMongoDatabase() {
  const MONGO_URI = process.env["MONGO_URI"];

  if (!MONGO_URI) throw new Error("MONGO_URI not found.");
  try {
    return await connect(MONGO_URI);
  } catch (e) {
    console.error(e);
  }
}
