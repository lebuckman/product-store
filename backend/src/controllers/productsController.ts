import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";
import { BadRequestError, ForbiddenError } from "../errors/httpErrors";
import { NewProduct } from "../db/schema";
import { validateStringField } from "../utils/validation";

export async function getAllProducts(req: Request, res: Response) {
    const products = await queries.getAllProducts();

    res.json(products);
}

export async function getMyProducts(req: Request, res: Response) {
    // requireAuth() middleware guarantees userId is present
    const userId = getAuth(req).userId!;

    const products = await queries.getProductByUserId(userId);

    res.json(products);
}

export async function getProductById(req: Request, res: Response) {
    const { id } = req.params;

    const product = await queries.getProductById(id);

    res.json(product);
}

export async function createProduct(req: Request, res: Response) {
    // requireAuth() middleware guarantees userId is present
    const userId = getAuth(req).userId!;
    let { title, description, imageUrl } = req.body;

    title = validateStringField(title, "Title");
    description = validateStringField(description, "Description");
    imageUrl = validateStringField(imageUrl, "Image URL");

    const product = await queries.createProduct({
        title,
        description,
        imageUrl,
        userId,
    });

    res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response) {
    // requireAuth() middleware guarantees userId is present
    const userId = getAuth(req).userId!;
    const { id } = req.params;
    let { title, description, imageUrl } = req.body;

    const updates: Partial<NewProduct> = {};

    if (title !== undefined) {
        updates.title = validateStringField(title, "Title");
    }

    if (description !== undefined) {
        updates.description = validateStringField(description, "Description");
    }

    if (imageUrl !== undefined) {
        updates.imageUrl = validateStringField(imageUrl, "Image URL");
    }

    if (Object.keys(updates).length === 0) {
        throw new BadRequestError(
            "At least one field must be provided for update"
        );
    }

    // Verify product exists (throws 404 if not found)
    const existingProduct = await queries.getProductById(id);
    if (existingProduct.userId !== userId) {
        throw new ForbiddenError("You can only update your own products");
    }

    const product = await queries.updateProduct(id, updates);

    res.status(200).json(product);
}

export const deleteProduct = async (req: Request, res: Response) => {
    // requireAuth() middleware guarantees userId is present
    const userId = getAuth(req).userId!;
    const { id } = req.params;

    // Verify product exists (throws 404 if not found)
    const existingProduct = await queries.getProductById(id);
    if (existingProduct.userId !== userId) {
        throw new ForbiddenError("You can only delete your own products");
    }

    await queries.deleteProduct(id);

    res.status(204).send();
};
