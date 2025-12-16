import express from "express";
import "dotenv/config";
import { AllRoutes } from "./routes/allRoutes.js";
import { connectDB } from "./services/db/mongodb.js";

console.log("I'm Server",);
connectDB();
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

app.use("/api", AllRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
