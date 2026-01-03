import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/httpErrors";

export default function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    if (err instanceof HttpError) {
        return res.status(err.status).json({ error: err.message });
    }

    res.status(500).json({ error: "Internal server error" });
}
