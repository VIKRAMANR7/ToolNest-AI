import express from "express";

import {
  getPublishedCreations,
  getUserCreations,
  toggleLikeCreation,
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get("/creations", auth, getUserCreations);
userRouter.get("/creations/published", auth, getPublishedCreations);
userRouter.post("/creations/:id/like", auth, toggleLikeCreation);

export default userRouter;
