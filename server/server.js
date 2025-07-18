import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectCloudinary from "./configs/cloudinary.js";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = 3000;

await connectCloudinary();

//Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
//API Routes
app.get("/", (req, res) => {
  res.send("toolnestai Server is Live");
});

app.use(requireAuth());

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`toolnestai Server listening at http://localhost:${port}`);
});
