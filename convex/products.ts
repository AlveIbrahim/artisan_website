import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Helper function to check if user is admin
async function isUserAdmin(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    return false;
  }
  
  // Query the userRoles table to check if user is admin
  const userRole = await ctx.db
    .query("userRoles")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .unique();
    
  return userRole?.role === "admin";
}

export const list = query({
  args: {
    category: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let products;
    
    if (args.category) {
      products = await ctx.db
        .query("products")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .take(args.limit || 50);
    } else if (args.featured) {
      products = await ctx.db
        .query("products")
        .withIndex("by_featured", (q) => q.eq("featured", true))
        .take(args.limit || 50);
    } else {
      products = await ctx.db.query("products").take(args.limit || 50);
    }
    
    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageUrl: product.imageId ? await ctx.storage.getUrl(product.imageId) : null,
      }))
    );
  },
});

export const get = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) return null;
    
    return {
      ...product,
      imageUrl: product.imageId ? await ctx.storage.getUrl(product.imageId) : null,
    };
  },
});

export const search = query({
  args: { 
    query: v.string(),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withSearchIndex("search_products", (q) => {
        let searchQuery = q.search("name", args.query);
        if (args.category) {
          searchQuery = searchQuery.eq("category", args.category);
        }
        return searchQuery;
      })
      .take(20);
    
    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageUrl: product.imageId ? await ctx.storage.getUrl(product.imageId) : null,
      }))
    );
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    imageId: v.optional(v.id("_storage")),
    category: v.string(),
    materials: v.array(v.string()),
    dimensions: v.optional(v.string()),
    weight: v.optional(v.string()),
    quantity: v.number(),
    featured: v.optional(v.boolean()),
    artistNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user is admin
    if (!(await isUserAdmin(ctx))) {
      throw new Error("Only admins can create products");
    }
    
    return await ctx.db.insert("products", {
      ...args,
      inStock: args.quantity > 0,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.string(),
    description: v.string(),
    price: v.number(),
    imageId: v.optional(v.id("_storage")),
    category: v.string(),
    materials: v.array(v.string()),
    dimensions: v.optional(v.string()),
    weight: v.optional(v.string()),
    inStock: v.boolean(),
    quantity: v.number(),
    featured: v.optional(v.boolean()),
    artistNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user is admin
    if (!(await isUserAdmin(ctx))) {
      throw new Error("Only admins can update products");
    }
    
    const { id, ...productData } = args;
    return await ctx.db.patch(id, productData);
  },
});

export const deleteProduct = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    // Check if user is admin
    if (!(await isUserAdmin(ctx))) {
      throw new Error("Only admins can delete products");
    }
    
    return await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to upload images");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const initSampleData = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").take(1);
    if (existing.length > 0) return "Data exists";

    await ctx.db.insert("categories", { 
      name: "Pottery", 
      description: "Handcrafted ceramic pieces" 
    });
    
    await ctx.db.insert("products", {
      name: "Rustic Clay Vase",
      description: "Beautiful handcrafted vase with earthy tones.",
      price: 85,
      category: "Pottery",
      materials: ["Clay", "Natural Glaze"],
      quantity: 5,
      inStock: true,
      featured: true,
    });

    return "Sample data created";
  },
});
