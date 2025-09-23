import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  userRoles: defineTable({
    userId: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("customer")),
  }).index("by_user", ["userId"]),
  
  products: defineTable({
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
  })
    .index("by_category", ["category"])
    .index("by_featured", ["featured"])
    .searchIndex("search_products", {
      searchField: "name",
      filterFields: ["category", "inStock"],
    }),

  orders: defineTable({
    userId: v.id("users"),
    items: v.array(v.object({
      productId: v.id("products"),
      quantity: v.number(),
      price: v.number(),
      productName: v.string(),
    })),
    totalAmount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    shippingAddress: v.object({
      name: v.string(),
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("failed")
    ),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  cart: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_product", ["userId", "productId"]),

  categories: defineTable({
    name: v.string(),
    description: v.string(),
    imageId: v.optional(v.id("_storage")),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
