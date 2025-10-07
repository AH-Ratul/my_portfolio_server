import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";

export const appRouter = Router();

appRouter.use("/auth", authRoute);
