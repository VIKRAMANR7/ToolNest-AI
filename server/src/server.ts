import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { validateEnv } from "./configs/validateEnv.js";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { connectDB } from "./configs/db.js";
import { connectCloudinary } from "./configs/cloudinary.js";

validateEnv();

connectDB();

connectCloudinary();

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "https://toolnestai.vercel.app",
].filter(Boolean) as string[];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(clerkMiddleware());

app.use((req: Request, _res: Response, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.get("/", (_req: Request, res: Response) => {
  res.send("ToolNest AI Server is Live");
});

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 ToolNest AI Server running on port ${PORT}`);
});

export default app;
