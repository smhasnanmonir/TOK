import { createDB } from "../../db";
import { shopByType } from "../../db/schema";
import { D1Database } from "@cloudflare/workers-types";

const shopByTypeFetchService = async (db: D1Database) => {
  const drizzleDB = createDB(db);
  const result = await drizzleDB.select().from(shopByType);
  return result;
};

const shopByTypePostService = async (
  db: D1Database,
  props: typeof shopByType.$inferInsert
) => {
  const drizzleDB = createDB(db);
  const result = await drizzleDB.insert(shopByType).values({
    name: props.name,
    slug: props.slug,
    img: props.img,
  });
  return result;
};

export const shopByTypeService = {
  shopByTypeFetchService,
  shopByTypePostService,
};
