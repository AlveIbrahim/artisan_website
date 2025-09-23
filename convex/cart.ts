import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    
    return Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        if (!product) return null;
        
        return {
          ...item,
          product: {
            ...product,
            imageUrl: product.imageId ? await ctx.storage.getUrl(product.imageId) : null,
          },
        };
      })
    ).then(items => items.filter(Boolean));
  },
});

export const add = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to add to cart");
    }
    
    const product = await ctx.db.get(args.productId);
    if (!product || !product.inStock) {
      throw new Error("Product not available");
    }
    
    const existing = await ctx.db
      .query("cart")
      .withIndex("by_user_and_product", (q) => 
        q.eq("userId", userId).eq("productId", args.productId)
      )
      .unique();
    
    if (existing) {
      await ctx.db.patch(existing._id, {
        quantity: existing.quantity + args.quantity,
      });
    } else {
      await ctx.db.insert("cart", {
        userId,
        productId: args.productId,
        quantity: args.quantity,
      });
    }
  },
});

export const remove = mutation({
  args: { id: v.id("cart") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in");
    }
    
    const item = await ctx.db.get(args.id);
    if (!item || item.userId !== userId) {
      throw new Error("Cart item not found");
    }
    
    await ctx.db.delete(args.id);
  },
});

export const updateQuantity = mutation({
  args: {
    id: v.id("cart"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in");
    }
    
    const item = await ctx.db.get(args.id);
    if (!item || item.userId !== userId) {
      throw new Error("Cart item not found");
    }
    
    if (args.quantity <= 0) {
      await ctx.db.delete(args.id);
    } else {
      await ctx.db.patch(args.id, { quantity: args.quantity });
    }
  },
});

export const clear = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in");
    }
    
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    
    for (const item of cartItems) {
      await ctx.db.delete(item._id);
    }
  },
});
