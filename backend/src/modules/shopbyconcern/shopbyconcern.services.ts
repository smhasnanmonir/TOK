import { createDB } from "../../db";
import { shopByConcern } from "../../db/schema";
import { D1Database } from "@cloudflare/workers-types";

const shopByConcernFetchService = async (db: D1Database) => {
  const drizzleDB = createDB(db);
  const result = await drizzleDB.select().from(shopByConcern);
  return result;
};

const shopByConcernPostService = async (
  db: D1Database,
  props: typeof shopByConcern.$inferInsert
) => {
  const drizzleDB = createDB(db);
  const result = await drizzleDB.insert(shopByConcern).values({
    name: props.name,
    slug: props.slug,
    img: props.img,
  });
  return result;
};

export const shopByConcernService = {
  shopByConcernFetchService,
  shopByConcernPostService,
};
