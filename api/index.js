import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../index.js";
import { connectDB } from "../services/db/mongodb.js";

export default async function handler(req, res) {
  try {
    await connectDB();  
    app(req, res);      
  } catch (err) {
    console.error("Serverless Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
