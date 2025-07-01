import { PrismaClient } from "../generated/prisma";

// For local development
const prisma = new PrismaClient();

export default prisma;

// For Cloudflare Workers (when you deploy)
export const createPrismaClient = (env: any) => {
  return new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL || "file:./dev.db",
      },
    },
  });
};
