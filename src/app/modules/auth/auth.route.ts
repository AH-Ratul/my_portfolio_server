import { Router } from "express";
import { AuthController } from "./auth.controller";

export const authRoute = Router();

authRoute.get("/", AuthController.getUser);
authRoute.post("/login", AuthController.credentialsLogin);
authRoute.post("/logout", AuthController.logout);
