import { db } from ".";
import { eq } from "drizzle-orm";
import {
    users,
    comments,
    products,
    type NewUser,
    type NewComment,
    type NewProduct,
} from "./schema";
import { HttpError } from "../errors/httpErrors";

function checkResultExists<T>(
    result: T | undefined,
    status: number,
    errMsg: string
) {
    if (!result) {
        throw new HttpError(status, errMsg);
    }

    return result;
}

/* ----------------- */
/* User Queries      */
/* ----------------- */

export const upsertUser = async (data: NewUser) => {
    const [user] = await db
        .insert(users)
        .values(data)
        .onConflictDoUpdate({
            target: users.id,
            set: data,
        })
        .returning();
    return user;
};

export const getUserById = async (id: string) => {
    const user = await db.query.users.findFirst({ where: eq(users.id, id) });

    return checkResultExists(user, 404, `User with id ${id} not found`);
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
    const [user] = await db
        .update(users)
        .set(data)
        .where(eq(users.id, id))
        .returning();

    return checkResultExists(user, 404, `User with id ${id} not found`);
};

/* ----------------- */
/* Product Queries   */
/* ----------------- */

export const getAllProducts = async () => {
    return await db.query.products.findMany({
        with: { user: true },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
};

export const getProductById = async (id: string) => {
    const product = await db.query.products.findFirst({
        where: eq(products.id, id),
        with: {
            user: true,
            comments: {
                with: { user: true },
                orderBy: (comments, { desc }) => [desc(comments.createdAt)],
            },
        },
    });

    return checkResultExists(product, 404, `Product with id ${id} not found`);
};

export const getProductByUserId = async (userId: string) => {
    return await db.query.products.findMany({
        where: eq(products.userId, userId),
        with: { user: true },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
};

export const createProduct = async (data: NewProduct) => {
    const [product] = await db.insert(products).values(data).returning();
    return product;
};

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
    const [product] = await db
        .update(products)
        .set(data)
        .where(eq(products.id, id))
        .returning();

    return checkResultExists(product, 404, `Product with id ${id} not found`);
};

export const deleteProduct = async (id: string) => {
    const [product] = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();

    return checkResultExists(product, 404, `Product with id ${id} not found`);
};

/* ----------------- */
/* Comment Queries   */
/* ----------------- */

export const getCommentById = async (id: string) => {
    const comment = await db.query.comments.findFirst({
        where: eq(comments.id, id),
        with: { user: true },
    });

    return checkResultExists(comment, 404, `Comment with id ${id} not found`);
};

export const createComment = async (data: NewComment) => {
    const [comment] = await db.insert(comments).values(data).returning();
    return comment;
};

export const deleteComment = async (id: string) => {
    const [comment] = await db
        .delete(comments)
        .where(eq(comments.id, id))
        .returning();

    return checkResultExists(comment, 404, `Comment with id ${id} not found`);
};
