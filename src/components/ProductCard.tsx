import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";

interface Product {
  _id: Id<"products">;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  materials: string[];
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onViewProduct: (id: Id<"products">) => void;
}

export function ProductCard({ product, onViewProduct }: ProductCardProps) {
  const addToCart = useMutation(api.cart.add);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addToCart({ productId: product._id, quantity: 1 });
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div 
      className="group cursor-pointer"
      onClick={() => onViewProduct(product._id)}
    >
      <div className="aspect-[4/5] bg-soft-gray mb-6 image-hover">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-6xl text-medium-gray">
              {product.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="heading-sm group-hover:text-sage transition-colors mb-1">
              {product.name}
            </h3>
            <p className="body-sm text-charcoal-light uppercase tracking-wider">
              {product.category}
            </p>
          </div>
          <span className="font-display text-lg text-charcoal ml-4">
            ${product.price}
          </span>
        </div>
        
        <p className="body-sm text-charcoal-light line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {product.materials.slice(0, 2).map((material, index) => (
            <span 
              key={index}
              className="text-xs bg-medium-gray text-charcoal px-2 py-1 rounded-sm font-sans"
            >
              {material}
            </span>
          ))}
        </div>
        
        <div className="pt-4">
          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              className="w-full btn-outline text-sm py-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Add to Cart
            </button>
          ) : (
            <span className="text-charcoal-light text-sm font-medium">
              Sold Out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
