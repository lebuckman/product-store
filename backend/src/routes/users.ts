import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { syncUser } from "../controllers/usersController";

export const usersRouter = Router();

usersRouter.post("/sync", requireAuth(), syncUser); 
