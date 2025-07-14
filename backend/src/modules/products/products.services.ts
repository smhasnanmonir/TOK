import { createDB, productDetails, products } from "../../db";
import { D1Database } from "@cloudflare/workers-types";

const productsFetchService = async (db: D1Database) => {
  const drizzleDB = createDB(db);
  const result = await drizzleDB.query.products.findMany({
    with: {
      details: true,
    },
  });
  return result;
};

const singleProductFetchService = async (db: D1Database, slug: string) => {
  const drizzleDB = createDB(db);
  const result = await drizzleDB.query.products.findFirst({
    where: (products, { eq }) => eq(products.slug, slug),
    with: {
      details: true,
    },
  });
  return result;
};

const productsPostService = async (
  db: D1Database,
  productProps: typeof products.$inferInsert,
  detailProps: typeof productDetails.$inferInsert
) => {
  console.log(productProps, detailProps);

  // Convert arrays to JSON strings for D1 compatibility
  const howToUseJson = JSON.stringify(detailProps.how_to_use);
  const benefitsJson = JSON.stringify(detailProps.benefits);
  const photosJson = JSON.stringify(detailProps.photos);

  // Use batch for true transaction behavior
  const results = await db.batch([
    db
      .prepare(
        `
      INSERT INTO products (name, slug, img, brand, card_photo, price, category, skin_type, skin_concern, in_stock)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
      )
      .bind(
        productProps.name,
        productProps.slug,
        productProps.img,
        productProps.brand,
        productProps.card_photo,
        productProps.price,
        productProps.category,
        productProps.skin_type,
        productProps.skin_concern,
        productProps.stock
      ),
    db
      .prepare(
        `
      INSERT INTO product_details (product_id, sizes, description, key_ingredient, how_to_use, benefits, photos)
      VALUES (last_insert_rowid(), ?, ?, ?, ?, ?, ?)
    `
      )
      .bind(
        detailProps.sizes,
        detailProps.description,
        detailProps.key_ingredient,
        howToUseJson,
        benefitsJson,
        photosJson
      ),
  ]);

  const productId = results[0].meta.last_row_id;
  return { productResult: { id: productId }, detailResult: results[1] };
};

export const productsService = {
  productsFetchService,
  productsPostService,
  singleProductFetchService,
};
