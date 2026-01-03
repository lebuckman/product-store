import { Router } from "express";
import { requireAuth } from "@clerk/express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getMyProducts,
    getProductById,
    updateProduct,
} from "../controllers/productsController";

export const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/my", requireAuth(), getMyProducts);
productsRouter.get("/:id", getProductById);

productsRouter.post("/", requireAuth(), createProduct);

productsRouter.put("/:id", requireAuth(), updateProduct);

productsRouter.delete("/:id", requireAuth(), deleteProduct);
