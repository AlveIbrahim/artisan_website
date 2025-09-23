import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ProductCard } from "./ProductCard";
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";

interface ProductCatalogProps {
  category: string | null;
  onViewProduct: (id: Id<"products">) => void;
  onBack: () => void;
}

export function ProductCatalog({ category, onViewProduct, onBack }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const products = useQuery(api.products.list, { category: category || undefined });
  const searchResults = useQuery(
    api.products.search, 
    searchQuery ? { query: searchQuery, category: category || undefined } : "skip"
  );

  const displayProducts = searchQuery ? searchResults : products;

  return (
    <div className="min-h-screen">
      <div className="section-padding">
        <div className="container-max">
          <div className="flex items-center justify-between mb-12">
            <div>
              <button 
                onClick={onBack}
                className="text-charcoal-light hover:text-charcoal mb-6 flex items-center gap-2 font-sans text-sm uppercase tracking-wider"
              >
                ← Back
              </button>
              <h1 className="heading-lg">
                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection` : "All Pieces"}
              </h1>
            </div>
          </div>

          <div className="mb-12">
            <input
              type="text"
              placeholder="Search pieces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-3 rounded-sm border border-medium-gray 
                       focus:border-sage focus:ring-1 focus:ring-sage outline-none
                       bg-warm-white font-sans"
            />
          </div>

          {displayProducts && displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
              {displayProducts.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onViewProduct={onViewProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="body-lg text-charcoal-light">
                {searchQuery ? "No pieces found matching your search." : "No pieces available."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
