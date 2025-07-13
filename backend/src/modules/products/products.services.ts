import { createDB, productDetails, products } from "../../db";
import { D1Database } from "@cloudflare/workers-types";

const productsFetchService = async (db: D1Database) => {
  const drizzleDB = createDB(db);
  const result = await drizzleDB.select().from(products);
  return result;
};

const productsPostService = async (
  db: D1Database,
  productProps: typeof products.$inferInsert,
  detailProps: typeof productDetails.$inferInsert
) => {
  const drizzleDB = createDB(db);

  const result = await drizzleDB.transaction(async (tx: any) => {
    const productResult = await tx
      .insert(products)
      .values({
        name: productProps.name,
        slug: productProps.slug,
        img: productProps.img,
        brand: productProps.brand,
        card_photo: productProps.card_photo,
        price: productProps.price,
        category: productProps.category,
        skin_type: productProps.skin_type,
        skin_concern: productProps.skin_concern,
        stock: productProps.stock,
      })
      .returning();
    const detailResult = await tx.insert(productDetails).values({
      productId: productResult[0].id,
      sizes: detailProps.sizes,
      description: detailProps.description,
      key_ingredient: detailProps.key_ingredient,
      how_to_use: detailProps.how_to_use,
      benefits: detailProps.benefits,
      photos: detailProps.photos,
    });
    return { productResult, detailResult };
  });
  return result;
};

export const productsService = {
  productsFetchService,
  productsPostService,
};
