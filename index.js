console.log("I'm Server",);
import express from "express";
import "dotenv/config";
import { AllRoutes } from "./routes/allRoutes.js";
// import { connectDB } from "./services/db/mongodb.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// connectDB();
const app = express();
app.use(cors( {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
})); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// app.use(async (req, res, next) => {
//     await connectDB();
//     next();
// });
app.use("/api", AllRoutes);

export default app

// const port = process.env.PORT || 5000;


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
