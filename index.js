import express from "express";
import "dotenv/config";
import { AllRoutes } from "./routes/allRoutes.js";

console.log("I'm Server");

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api", AllRoutes);  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
