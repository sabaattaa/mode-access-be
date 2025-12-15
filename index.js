import express from "express";
import "dotenv/config";
import { AllRouter } from "./routes/allRoutes.js";

console.log("I'm Server");

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api", AllRouter);  
// app.post("/api/post", (req, res) => {
//   res.send("Post route working");
// }); 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
