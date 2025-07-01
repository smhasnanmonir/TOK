import express, { Application, Request, Response } from "express";
import app from "./index";
import { Server } from "http";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

const port = process.env.PORT || 3004;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`the server is listening on ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
