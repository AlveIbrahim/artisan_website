import { mutation } from "./_generated/server";
import { v } from "convex/values";

// This is a utility function to set a user as an admin
// You can run this from the Convex dashboard
export const makeUserAdmin = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Check if user already has a role
    const existingRole = await ctx.db
      .query("userRoles")
      .withIndex("by_user", (q: any) => q.eq("userId", args.userId))
      .unique();
      
    if (existingRole) {
      // Update existing role to admin
      return await ctx.db.patch(existingRole._id, { role: "admin" });
    } else {
      // Create new role entry as admin
      return await ctx.db.insert("userRoles", {
        userId: args.userId,
        role: "admin"
      });
    }
  },
});