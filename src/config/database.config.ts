import mongoose from "mongoose";
import credentialsConfig from "./credentials.config";

async function connectionDB() {
  const connect = await mongoose.connect(credentialsConfig.DATABASE.MONGO_URI);
  return connect;
}

export default connectionDB;
