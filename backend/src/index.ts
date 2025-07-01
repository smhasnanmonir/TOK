import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./module/user/user.router";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({
    message: "TOK is healing.",
  });
});

app.use("/api/v1", userRouter);

export default app;
