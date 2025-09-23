import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { Categories } from "./components/Categories";
import { Artists } from "./components/Artists";
import { Footer } from "./components/Footer";
import { useState } from "react";
import { ProductCatalog } from "./components/ProductCatalog";
import { Cart } from "./components/Cart";
import { ProductDetail } from "./components/ProductDetail";
import AdminPanel from "./components/AdminPanel";
import { Id } from "../convex/_generated/dataModel";

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'cart' | 'product' | 'admin'>('home');
  const [selectedProductId, setSelectedProductId] = useState<Id<"products"> | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isAdmin = useQuery(api.auth.isAdmin);

  const handleViewProduct = (productId: Id<"products">) => {
    setSelectedProductId(productId);
    setCurrentView('product');
  };

  const handleViewCatalog = (category?: string) => {
    setSelectedCategory(category || null);
    setCurrentView('catalog');
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <Header 
        onViewHome={() => setCurrentView('home')}
        onViewCatalog={() => handleViewCatalog()}
        onViewCart={() => setCurrentView('cart')}
        onViewAdmin={() => setCurrentView('admin')}
      />
      
      <main className="flex-1">
        <Content 
          currentView={currentView}
          selectedProductId={selectedProductId}
          selectedCategory={selectedCategory}
          onViewProduct={handleViewProduct}
          onViewCatalog={handleViewCatalog}
          onBack={() => setCurrentView('home')}
        />
      </main>
      
      <Footer />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#3a3a3a',
            color: '#fefefe',
            border: 'none',
            borderRadius: '2px',
          },
        }}
      />
    </div>
  );
}

function Content({ 
  currentView, 
  selectedProductId, 
  selectedCategory,
  onViewProduct, 
  onViewCatalog,
  onBack 
}: {
  currentView: string;
  selectedProductId: Id<"products"> | null;
  selectedCategory: string | null;
  onViewProduct: (id: Id<"products">) => void;
  onViewCatalog: (category?: string) => void;
  onBack: () => void;
}) {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage"></div>
      </div>
    );
  }

  if (currentView === 'cart') {
    return <Cart onBack={onBack} />;
  }

  if (currentView === 'product' && selectedProductId) {
    return <ProductDetail productId={selectedProductId} onBack={onBack} />;
  }
  
  if (currentView === 'admin') {
    return <AdminPanel />;
  }

  if (currentView === 'catalog') {
    return (
      <ProductCatalog 
        category={selectedCategory}
        onViewProduct={onViewProduct}
        onBack={onBack}
      />
    );
  }

  return (
    <div>
      <Unauthenticated>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="text-center mb-12">
              <h1 className="heading-lg mb-6 text-balance">
                Welcome to
                <span className="block text-sage italic">Artisan's Haven</span>
              </h1>
              <p className="body-lg text-charcoal-light text-balance">
                Discover unique handcrafted treasures from talented artisans
              </p>
            </div>
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <Hero onViewCatalog={onViewCatalog} />
        <FeaturedProducts onViewProduct={onViewProduct} />
        <Categories onViewCategory={onViewCatalog} />
        <Artists />
      </Authenticated>
    </div>
  );
}
