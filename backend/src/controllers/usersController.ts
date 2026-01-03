import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";
import { BadRequestError } from "../errors/httpErrors";

// Sync Clerk user to our DB
export async function syncUser(req: Request, res: Response) {
    // requireAuth() middleware guarantees userId is present
    const userId = getAuth(req).userId!;
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
