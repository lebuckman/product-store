import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";

import { usersRouter } from "./routes/users";
import { productsRouter } from "./routes/products";
import { commentsRouter } from "./routes/comments";
import errorHandler from "./middleware/errorHandler";

const app = express();
const PORT = ENV.PORT || 8000;
const FRONTEND_URL = ENV.FRONTEND_URL;

if (!FRONTEND_URL) {
    throw new Error("Add FRONTEND_URL to the .env file");
}

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
    res.json({
        message:
            "Productify API - Powered by PostgreSQL, Drizzle ORM, & Clerk Auth",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments",
        },
    });
});

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/comments", commentsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}).on("error", (err) => {
    console.error("Failed to start server:", err);
});
