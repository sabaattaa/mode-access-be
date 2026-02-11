import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../index.js";
import { connectDB } from "../services/db/mongodb.js";

export default async function handler(req, res) {
  try {
    // 1. Pehle OPTIONS request (Preflight) handle karein
    // Browser sirf yeh check karna chahta hai ke API allow hai ya nahi.
    // Iske liye Database connect karne ki zaroorat nahi hai.
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
      return res.status(200).end();
    }

    // 2. Sirf tab DB connect karein jab request OPTIONS nahi hai (e.g., POST, GET)
    await connectDB();

    // 3. Request ko Express app par pass karein
    await app(req, res); 

  } catch (err) {
    console.error("Serverless Function Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}