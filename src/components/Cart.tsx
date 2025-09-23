import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";

interface CartProps {
  onBack: () => void;
}

export function Cart({ onBack }: CartProps) {
  const cartItems = useQuery(api.cart.list);
  const updateQuantity = useMutation(api.cart.updateQuantity);
  const removeItem = useMutation(api.cart.remove);
  const createOrder = useMutation(api.orders.create);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const total = cartItems?.reduce((sum, item) => 
    item ? sum + (item.product.price * item.quantity) : sum, 0
  ) || 0;

  const handleUpdateQuantity = async (itemId: Id<"cart">, newQuantity: number) => {
    try {
      await updateQuantity({ id: itemId, quantity: newQuantity });
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (itemId: Id<"cart">) => {
    try {
      await removeItem({ id: itemId });
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartItems || cartItems.length === 0) return;

    try {
      const items = cartItems.filter(item => item !== null).map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      await createOrder({ items, shippingAddress });
      toast.success("Order placed successfully!");
      setShowCheckout(false);
      onBack();
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  if (!cartItems) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="section-padding">
        <div className="container-narrow">
          <div className="flex items-center justify-between mb-12">
            <div>
              <button 
                onClick={onBack}
                className="text-charcoal-light hover:text-charcoal mb-6 flex items-center gap-2 font-sans text-sm uppercase tracking-wider"
              >
                ← Back
              </button>
              <h1 className="heading-lg">Shopping Cart</h1>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-24">
              <p className="body-lg text-charcoal-light mb-8">Your cart is empty</p>
              <button 
                onClick={onBack}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {cartItems.filter(item => item).map((item) => (
                <div key={item!._id} className="card p-8">
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-24 bg-soft-gray flex-shrink-0">
                      {item!.product.imageUrl ? (
                        <img 
                          src={item!.product.imageUrl} 
                          alt={item!.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-display text-2xl text-medium-gray">
                            {item!.product.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="heading-sm mb-1">
                        {item!.product.name}
                      </h3>
                      <p className="body-sm text-charcoal-light uppercase tracking-wider mb-2">
                        {item!.product.category}
                      </p>
                      <p className="font-display text-lg text-charcoal">
                        ${item!.product.price} each
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <select 
                        value={item!.quantity}
                        onChange={(e) => handleUpdateQuantity(item!._id, Number(e.target.value))}
                        className="px-3 py-2 border border-medium-gray rounded-sm bg-warm-white font-sans"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleRemoveItem(item!._id)}
                        className="text-charcoal-light hover:text-charcoal transition-colors font-sans text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-display text-xl text-charcoal">
                        ${(item!.product.price * item!.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="card p-8">
                <div className="flex justify-between items-center mb-8">
                  <span className="heading-sm">Total:</span>
                  <span className="font-display text-3xl text-charcoal">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full btn-primary text-lg py-4"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}

          {showCheckout && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-warm-white p-8 rounded-sm max-w-md w-full max-h-[90vh] overflow-y-auto">
                <h2 className="heading-sm mb-8">Shipping Information</h2>
                
                <form onSubmit={handleCheckout} className="space-y-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={shippingAddress.name}
                    onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-medium-gray rounded-sm bg-warm-white font-sans"
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-medium-gray rounded-sm bg-warm-white font-sans"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      required
                      className="px-4 py-3 border border-medium-gray rounded-sm bg-warm-white font-sans"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                      required
                      className="px-4 py-3 border border-medium-gray rounded-sm bg-warm-white font-sans"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                      required
                      className="px-4 py-3 border border-medium-gray rounded-sm bg-warm-white font-sans"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                      required
                      className="px-4 py-3 border border-medium-gray rounded-sm bg-warm-white font-sans"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCheckout(false)}
                      className="flex-1 btn-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-primary"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
