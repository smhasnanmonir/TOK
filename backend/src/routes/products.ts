import { Hono } from "hono";
import { createDB } from "../db";
import { products } from "../db/schema";
import { eq, like, desc, and } from "drizzle-orm";

const productsRouter = new Hono<{
  Bindings: {
    DB: D1Database;
  };
}>();

// Get all products with pagination and filtering
productsRouter.get("/", async (c) => {
  try {
    const { page = "1", limit = "10", search, category, brand } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const db = createDB(c.env.DB);

    const filters = [
      eq(products.isActive, true),
      search ? like(products.name, `%${search}%`) : undefined,
      category ? eq(products.category, category) : undefined,
      brand ? eq(products.brand, brand) : undefined,
    ].filter(Boolean);

    const query = db
      .select()
      .from(products)
      .where(and(...filters));

    const allProducts = await query
      .orderBy(desc(products.createdAt))
      .limit(parseInt(limit))
      .offset(offset);

    const total = await db
      .select({ count: products.id })
      .from(products)
      .where(eq(products.isActive, true));

    return c.json({
      products: allProducts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total.length,
        totalPages: Math.ceil(total.length / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get product by ID
productsRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const db = createDB(c.env.DB);

    const product = await db.select().from(products).where(eq(products.id, id));

    if (product.length === 0) {
      return c.json({ error: "Product not found" }, 404);
    }

    return c.json({ product: product[0] });
  } catch (error) {
    console.error("Get product error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create new product (admin only)
productsRouter.post("/", async (c) => {
  try {
    const {
      name,
      description,
      price,
      brand,
      category,
      imageUrl,
      stockQuantity,
    } = await c.req.json();

    if (!name || !price || !brand || !category) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const db = createDB(c.env.DB);

    const newProduct = await db
      .insert(products)
      .values({
        name,
        description,
        price: parseFloat(price),
        brand,
        category,
        imageUrl,
        stockQuantity: stockQuantity || 0,
      })
      .returning();

    return c.json(
      {
        message: "Product created successfully",
        product: newProduct[0],
      },
      201
    );
  } catch (error) {
    console.error("Create product error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update product (admin only)
productsRouter.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const updateData = await c.req.json();

    const db = createDB(c.env.DB);

    // Check if product exists
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    if (existingProduct.length === 0) {
      return c.json({ error: "Product not found" }, 404);
    }

    const updatedProduct = await db
      .update(products)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    return c.json({
      message: "Product updated successfully",
      product: updatedProduct[0],
    });
  } catch (error) {
    console.error("Update product error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Delete product (admin only)
productsRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const db = createDB(c.env.DB);

    // Check if product exists
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    if (existingProduct.length === 0) {
      return c.json({ error: "Product not found" }, 404);
    }

    // Soft delete by setting isActive to false
    await db
      .update(products)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(products.id, id));

    return c.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get products by category
productsRouter.get("/category/:category", async (c) => {
  try {
    const category = c.req.param("category");
    const { page = "1", limit = "10" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const db = createDB(c.env.DB);

    const categoryProducts = await db
      .select()
      .from(products)
      .where(and(eq(products.category, category), eq(products.isActive, true)))
      .orderBy(desc(products.createdAt))
      .limit(parseInt(limit))
      .offset(offset);

    return c.json({
      products: categoryProducts,
      category,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: categoryProducts.length,
      },
    });
  } catch (error) {
    console.error("Get category products error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get products by brand
productsRouter.get("/brand/:brand", async (c) => {
  try {
    const brand = c.req.param("brand");
    const { page = "1", limit = "10" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const db = createDB(c.env.DB);

    const brandProducts = await db
      .select()
      .from(products)
      .where(and(eq(products.brand, brand), eq(products.isActive, true)))
      .orderBy(desc(products.createdAt))
      .limit(parseInt(limit))
      .offset(offset);

    return c.json({
      products: brandProducts,
      brand,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: brandProducts.length,
      },
    });
  } catch (error) {
    console.error("Get brand products error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default productsRouter;
