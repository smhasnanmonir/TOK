import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({
    message: "TOK is healing.",
  });
});

export default app;
