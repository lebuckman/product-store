import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";
import { validateStringField } from "../utils/validation";

// Sync Clerk user to our DB
export async function syncUser(req: Request, res: Response) {
    // requireAuth() middleware guarantees userId is present
    const userId = getAuth(req).userId!;
    let { name, email, imageUrl } = req.body;

    name = validateStringField(name, "Name");
    email = validateStringField(email, "Email");
    imageUrl = validateStringField(imageUrl, "Image URL");

    const user = await queries.upsertUser({
        id: userId,
        name,
        email,
        imageUrl,
    });

    res.json(user);
}
