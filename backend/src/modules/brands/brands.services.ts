import { createDB } from "../../db";
import { brands } from "../../db/schema";
import { D1Database } from "@cloudflare/workers-types";

const brandFetchService = async (db: D1Database) => {
  const drizzleDB = createDB(db);
  const result = await drizzleDB.select().from(brands);
  return result;
};

const brandPostService = async (
  db: D1Database,
  props: typeof brands.$inferInsert
) => {
  const drizzleDB = createDB(db);
  const result = await drizzleDB.insert(brands).values({
    name: props.name,
    slug: props.slug,
    img: props.img,
  });
  return result;
};

export const brandService = {
  brandFetchService,
  brandPostService,
};
