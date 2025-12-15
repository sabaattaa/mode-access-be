const { MongoClient } = require("mongodb");


let client;

export const connectDB = async () => {
  try {
    client = new MongoClient(dbUri);
    await client.connect();
    console.log("MongoDB connected");
    return client;
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

