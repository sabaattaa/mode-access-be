import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../index.js";
import { connectDB } from "../services/db/mongodb.js";

export default async function handler(req, res) {
  try {
    // DB connect
    await connectDB();

    // OPTIONS preflight for CORS
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
      return res.status(200).end();
    }

    // Pass request to Express app
    await app(req, res); 

  } catch (err) {
    console.error("Serverless Function Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
