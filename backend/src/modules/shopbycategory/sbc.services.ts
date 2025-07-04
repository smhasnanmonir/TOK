import { createDB } from "../../db";
import { shopByCategory } from "../../db/schema";
import { D1Database } from "@cloudflare/workers-types";

const shopByCategoryFetchService = async (db: D1Database) => {
  const drizzleDB = createDB(db);
  const result = await drizzleDB.select().from(shopByCategory);
  return result;
};

const shopByCategoryPostService = async (
  db: D1Database,
  props: typeof shopByCategory.$inferInsert
) => {
  const drizzleDB = createDB(db);
  const result = await drizzleDB.insert(shopByCategory).values({
    name: props.name,
    slug: props.slug,
    img: props.img,
  });
  return result;
};

export const shopByCategoryService = {
  shopByCategoryFetchService,
  shopByCategoryPostService,
};
