import { Hono } from "hono";
import { createDB } from "../db";
import { orders, orderItems, products } from "../db/schema";
import { eq, desc, and } from "drizzle-orm";
import { verify } from "hono/jwt";

declare module "hono" {
  interface ContextVariableMap {
    userId: string;
  }
}

const ordersRouter = new Hono<{
  Bindings: {
    DB: D1Database;
    JWT_SECRET: string;
  };
}>();

// Middleware to verify JWT token
const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "No token provided" }, 401);
  }

  try {
    const token = authHeader.substring(7);
    const payload = await verify(token, c.env.JWT_SECRET);
    c.var.userId = payload.userId;
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
};

// Get user's orders
ordersRouter.get("/", authMiddleware, async (c) => {
  try {
    const userId = c.var.userId;
    const { page = "1", limit = "10" } = c.req.query();
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const db = createDB(c.env.DB);

    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt))
      .limit(parseInt(limit))
      .offset(offset);

    return c.json({
      orders: userOrders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: userOrders.length,
      },
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get order by ID with items
ordersRouter.get("/:id", authMiddleware, async (c) => {
  try {
    const orderId = c.req.param("id");
    const userId = c.var.userId;

    const db = createDB(c.env.DB);

    // Get order
    const order = await db
      .select()
      .from(orders)
      .where(and(eq(orders.id, orderId), eq(orders.userId, userId)));

    if (order.length === 0) {
      return c.json({ error: "Order not found" }, 404);
    }

    // Get order items with product details
    const items = await db
      .select({
        id: orderItems.id,
        quantity: orderItems.quantity,
        price: orderItems.price,
        productId: orderItems.productId,
        productName: products.name,
        productImage: products.imageUrl,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, orderId));

    return c.json({
      order: order[0],
      items,
    });
  } catch (error) {
    console.error("Get order error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create new order
ordersRouter.post("/", authMiddleware, async (c) => {
  try {
    const userId = c.var.userId;
    const { items } = await c.req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return c.json({ error: "Order must contain at least one item" }, 400);
    }

    const db = createDB(c.env.DB);

    // Calculate total amount and validate products
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await db
        .select()
        .from(products)
        .where(
          and(eq(products.id, item.productId), eq(products.isActive, true))
        );

      if (product.length === 0) {
        return c.json({ error: `Product ${item.productId} not found` }, 404);
      }

      if (product[0].stockQuantity < item.quantity) {
        return c.json(
          { error: `Insufficient stock for product ${product[0].name}` },
          400
        );
      }

      const itemTotal = product[0].price * item.quantity;
      totalAmount += itemTotal;

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product[0].price,
      });
    }

    // Create order
    const newOrder = await db
      .insert(orders)
      .values({
        userId,
        totalAmount,
        status: "pending",
      })
      .returning();

    // Create order items
    const createdOrderItems = await Promise.all(
      orderItemsData.map((item) =>
        db
          .insert(orderItems)
          .values({
            orderId: newOrder[0].id,
            ...item,
          })
          .returning()
      )
    );

    // Update product stock
    for (const item of items) {
      const productToUpdate = await db
        .select()
        .from(products)
        .where(eq(products.id, item.productId));

      if (productToUpdate.length > 0) {
        await db
          .update(products)
          .set({
            stockQuantity: productToUpdate[0].stockQuantity - item.quantity,
          })
          .where(eq(products.id, item.productId));
      }
    }

    return c.json(
      {
        message: "Order created successfully",
        order: newOrder[0],
        items: createdOrderItems.map((item) => item[0]),
      },
      201
    );
  } catch (error) {
    console.error("Create order error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update order status (admin only)
ordersRouter.patch("/:id/status", async (c) => {
  try {
    const orderId = c.req.param("id");
    const { status } = await c.req.json();

    if (
      !status ||
      !["pending", "processing", "shipped", "delivered", "cancelled"].includes(
        status
      )
    ) {
      return c.json({ error: "Invalid status" }, 400);
    }

    const db = createDB(c.env.DB);

    const updatedOrder = await db
      .update(orders)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId))
      .returning();

    if (updatedOrder.length === 0) {
      return c.json({ error: "Order not found" }, 404);
    }

    return c.json({
      message: "Order status updated successfully",
      order: updatedOrder[0],
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default ordersRouter;
