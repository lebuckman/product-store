import express from "express";
import cors from "cors";
import path from "node:path";
import { ENV } from "../src/config/env";
import { clerkMiddleware } from "@clerk/express";

import { usersRouter } from "../src/routes/users";
import { productsRouter } from "../src/routes/products";
import { commentsRouter } from "../src/routes/comments";
import errorHandler from "../src/middleware/errorHandler";

const app = express();
const PORT = ENV.PORT || 8000;
const FRONTEND_URL = ENV.FRONTEND_URL;

if (!FRONTEND_URL) {
    throw new Error("Add FRONTEND_URL to the .env file");
}

const allowOrigins = [
    `http://localhost:5173`,
    FRONTEND_URL,
    /^https:\/\/product-store-.*\.vercel\.app$/, // Vercel previews
];

app.use(cors({ origin: allowOrigins, credentials: true }));
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

if (ENV.NODE_ENV === "production") {
    const __dirname = path.resolve();

    // server static files from frontend/dist
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // handle Single Page Application routing: send all non-API routes to index.html
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

export default app;

if (ENV.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    }).on("error", (err) => {
        console.error("Failed to start server:", err);
    });
}
