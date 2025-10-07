import express, { Request, Response } from "express";
import { appRouter } from "./app/route";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", appRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("My Portfolio is running");
});

app.use(globalErrorHandler);
