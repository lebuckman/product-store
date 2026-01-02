import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";

export async function createComment(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { productId } = req.params;
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({
                error: "Comment content is required",
            });
        }

        const existingProduct = await queries.getProductById(productId);
        if (!existingProduct) {
            return res.status(404).json({
                error: "Product not found",
            });
        }

        const comment = await queries.createComment({
            content,
            userId,
            productId,
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error("Failed to create comment:", error);
        res.status(500).json({ error: "Failed to create comment" });
    }
}

export async function deleteComment(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { commentId } = req.params;

        const existingComment = await queries.getCommentById(commentId);
        if (!existingComment) {
            return res.status(404).json({
                error: "Comment not found",
            });
        }

        if (existingComment.userId !== userId) {
            return res
                .status(403)
                .json({ error: "You can only delete your own comments" });
        }

        await queries.deleteComment(commentId);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
}
