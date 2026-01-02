import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";

// Sync Clerk user to our DB
export async function syncUser(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { name, email, imageUrl } = req.body;
        if (!name || !email || !imageUrl) {
            return res
                .status(400)
                .json({ error: "Name, email, and imageUrl are required" });
        }

        const user = await queries.upsertUser({
            id: userId,
            name,
            email,
            imageUrl,
        });

        res.json(user);
    } catch (error) {
        console.error("Failed to sync user:", error);
        res.status(500).json({ error: "Failed to sync user" });
    }
}
