import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";
import {
    BadRequestError,
    ForbiddenError,
    UnauthorizedError,
} from "../errors/httpErrors";

export async function createComment(req: Request, res: Response) {
    const { userId } = getAuth(req);
    if (!userId) {
        throw new UnauthorizedError();
    }

    const { productId } = req.params;
    const { content } = req.body;
    if (!content) {
        throw new BadRequestError("Comment content is required");
    }

    // Verify comment exists (throws 404 if not found)
    await queries.getProductById(productId);

    const comment = await queries.createComment({
        content,
        userId,
        productId,
    });

    res.status(201).json(comment);
}

export async function deleteComment(req: Request, res: Response) {
    const { userId } = getAuth(req);
    if (!userId) {
        throw new UnauthorizedError();
    }

    const { commentId } = req.params;

    // Verify comment exists (throws 404 if not found)
    const existingComment = await queries.getCommentById(commentId);

    if (existingComment.userId !== userId) {
        throw new ForbiddenError("You can only delete your own comments");
    }

    await queries.deleteComment(commentId);
    res.status(204).send();
}
