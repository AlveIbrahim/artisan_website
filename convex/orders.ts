import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    items: v.array(v.object({
      productId: v.id("products"),
      quantity: v.number(),
    })),
    shippingAddress: v.object({
      name: v.string(),
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to place order");
    }
    
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of args.items) {
      const product = await ctx.db.get(item.productId);
      if (!product || !product.inStock || product.quantity < item.quantity) {
        throw new Error(`Product ${product?.name || 'unknown'} is not available in requested quantity`);
      }
      
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        productName: product.name,
      });
      
      // Update product quantity
      await ctx.db.patch(item.productId, {
        quantity: product.quantity - item.quantity,
        inStock: product.quantity - item.quantity > 0,
      });
    }
    
    const orderId = await ctx.db.insert("orders", {
      userId,
      items: orderItems,
      totalAmount,
      status: "pending",
      shippingAddress: args.shippingAddress,
      paymentStatus: "pending",
    });
    
    // Clear cart after successful order
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    
    for (const cartItem of cartItems) {
      await ctx.db.delete(cartItem._id);
    }
    
    return orderId;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    
    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    
    const order = await ctx.db.get(args.id);
    if (!order || order.userId !== userId) return null;
    
    return order;
  },
});
