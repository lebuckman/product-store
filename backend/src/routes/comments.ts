import { requireAuth } from "@clerk/express";
import { Router } from "express";
import {
    createComment,
    deleteComment,
} from "../controllers/commentsController";

export const commentsRouter = Router();

commentsRouter.post("/:productId", requireAuth(), createComment);

commentsRouter.delete("/:commentId", requireAuth(), deleteComment);
