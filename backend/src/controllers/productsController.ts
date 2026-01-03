import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";
import {
    BadRequestError,
    ForbiddenError,
    NotFoundError,
    UnauthorizedError,
} from "../errors/httpErrors";

export async function getAllProducts(req: Request, res: Response) {
    const products = await queries.getAllProducts();
    res.json(products);
}

export async function getMyProducts(req: Request, res: Response) {
    const { userId } = getAuth(req);
    if (!userId) {
        throw new UnauthorizedError();
    }

    const products = await queries.getProductByUserId(userId);
    res.json(products);
}

export async function getProductById(req: Request, res: Response) {
    const { id } = req.params;
    const product = await queries.getProductById(id);
    res.json(product);
}

export async function createProduct(req: Request, res: Response) {
    const { userId } = getAuth(req);
    if (!userId) {
        throw new UnauthorizedError();
    }

    const { title, description, imageUrl } = req.body;
    if (!title || !description || !imageUrl) {
        throw new BadRequestError(
            "Title, description, and imageUrl are required"
        );
    }

    const product = await queries.createProduct({
        title,
        description,
        imageUrl,
        userId,
    });

    res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response) {
    const { userId } = getAuth(req);
    if (!userId) {
        throw new UnauthorizedError();
    }

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
        throw new NotFoundError("Product not found");
    }

    if (existingProduct.userId !== userId) {
        throw new ForbiddenError("You can only update your own products");
    }

    const product = await queries.updateProduct(id, {
        title,
        description,
        imageUrl,
    });

    res.status(200).json(product);
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    if (!userId) {
        throw new UnauthorizedError();
    }

    const { id } = req.params;

    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
        throw new NotFoundError("Product not found");
    }

    if (existingProduct.userId !== userId) {
        throw new ForbiddenError("You can only delete your own products");
    }

    await queries.deleteProduct(id);
    res.status(204).send();
};
