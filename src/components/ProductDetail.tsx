import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";

interface ProductDetailProps {
  productId: Id<"products">;
  onBack: () => void;
}

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const product = useQuery(api.products.get, { id: productId });
  const addToCart = useMutation(api.cart.add);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart({ productId: product._id, quantity });
      toast.success(`Added ${quantity} item(s) to cart`);
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="section-padding">
        <div className="container-max">
          <button 
            onClick={onBack}
            className="text-charcoal-light hover:text-charcoal mb-12 flex items-center gap-2 font-sans text-sm uppercase tracking-wider"
          >
            ← Back to Shop
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="aspect-square bg-soft-gray">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-8xl text-medium-gray">
                    {product.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <span className="body-sm text-charcoal-light uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="heading-lg mt-2 mb-4">
                  {product.name}
                </h1>
                <p className="font-display text-2xl text-charcoal">
                  ${product.price}
                </p>
              </div>

              <p className="body-lg text-charcoal-light leading-relaxed">
                {product.description}
              </p>

              <div>
                <h3 className="font-sans font-medium text-charcoal mb-3 uppercase tracking-wider text-sm">
                  Materials
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material, index) => (
                    <span 
                      key={index}
                      className="bg-medium-gray text-charcoal px-3 py-1 rounded-sm text-sm font-sans"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {product.dimensions && (
                <div>
                  <h3 className="font-sans font-medium text-charcoal mb-2 uppercase tracking-wider text-sm">
                    Dimensions
                  </h3>
                  <p className="body-md text-charcoal-light">{product.dimensions}</p>
                </div>
              )}

              {product.weight && (
                <div>
                  <h3 className="font-sans font-medium text-charcoal mb-2 uppercase tracking-wider text-sm">
                    Weight
                  </h3>
                  <p className="body-md text-charcoal-light">{product.weight}</p>
                </div>
              )}

              {product.artistNotes && (
                <div>
                  <h3 className="font-sans font-medium text-charcoal mb-3 uppercase tracking-wider text-sm">
                    Artist's Notes
                  </h3>
                  <p className="body-md text-charcoal-light italic leading-relaxed">
                    {product.artistNotes}
                  </p>
                </div>
              )}

              {product.inStock ? (
                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-6">
                    <label className="font-sans font-medium text-charcoal uppercase tracking-wider text-sm">
                      Quantity
                    </label>
                    <select 
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="px-3 py-2 border border-medium-gray rounded-sm bg-warm-white font-sans"
                    >
                      {[...Array(Math.min(product.quantity, 10))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full btn-primary text-base py-4"
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <span className="text-charcoal-light font-medium">
                    Currently Unavailable
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
