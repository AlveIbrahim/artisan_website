import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ProductCard } from "./ProductCard";
import { SectionDivider } from "./SectionDivider";
import { Id } from "../../convex/_generated/dataModel";

interface FeaturedProductsProps {
  onViewProduct: (id: Id<"products">) => void;
}

export function FeaturedProducts({ onViewProduct }: FeaturedProductsProps) {
  const products = useQuery(api.products.list, { featured: true, limit: 6 });

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <section className="section-padding bg-soft-gray">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6">
              Featured Pieces
            </h2>
            <p className="body-lg max-w-2xl mx-auto text-balance">
              Carefully curated works that embody our commitment to exceptional 
              craftsmanship and sustainable artistry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {products.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Curved divider */}
      <SectionDivider variant="curve1" color="warm-white" />
    </div>
  );
}
