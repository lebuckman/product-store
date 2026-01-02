import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";

export async function getAllProducts(req: Request, res: Response) {
    try {
        const products = await queries.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Failed to get products:", error);
        res.status(500).json({ error: "Failed to get products" });
    }
}

export async function getMyProducts(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const products = await queries.getProductByUserId(userId);
        res.json(products);
    } catch (error) {
        console.error("Failed to get user products:", error);
        res.status(500).json({ error: "Failed to get user products" });
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const product = await queries.getProductById(id);
        res.json(product);
    } catch (error) {
        console.error("Failed to get product:", error);
        res.status(500).json({ error: "Failed to get product" });
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { title, description, imageUrl } = req.body;
        if (!title || !description || !imageUrl) {
            return res.status(400).json({
                error: "Title, description, and imageUrl are required",
            });
        }

        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Failed to create product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;
        const { title, description, imageUrl } = req.body;

        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({
                error: "Product not found",
            });
        }

        if (existingProduct.userId !== userId) {
            return res
                .status(403)
                .json({ error: "You can only update your own products" });
        }

        const product = await queries.updateProduct(id, {
            title,
            description,
            imageUrl,
        });

        res.status(200).json(product);
    } catch (error) {
        console.error("Failed to update product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.params;

        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (existingProduct.userId !== userId) {
            return res.status(403).json({
                error: "You can only delete your own products",
            });
        }

        await queries.deleteProduct(id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
};
