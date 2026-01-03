import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";
import { BadRequestError, UnauthorizedError } from "../errors/httpErrors";

// Sync Clerk user to our DB
export async function syncUser(req: Request, res: Response) {
    const { userId } = getAuth(req);
    if (!userId) {
        throw new UnauthorizedError();
    }

    const { name, email, imageUrl } = req.body;
    if (!name || !email || !imageUrl) {
        throw new BadRequestError("Name, email, and imageUrl are required");
    }

    const user = await queries.upsertUser({
        id: userId,
        name,
        email,
        imageUrl,
    });

    res.json(user);
}
