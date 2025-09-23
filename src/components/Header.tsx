import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { SignOutButton } from "../SignOutButton";
import { CartIcon } from "./CartIcon";
import { api } from "../../convex/_generated/api";

interface HeaderProps {
  onViewHome: () => void;
  onViewCatalog: () => void;
  onViewCart: () => void;
  onViewAdmin?: () => void;
}

export function Header({ 
  onViewHome, 
  onViewCatalog, 
  onViewCart,
  onViewAdmin
}: HeaderProps) {
  const isAdmin = useQuery(api.auth.isAdmin);
  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-medium-gray">
      <div className="container-max">
        <div className="flex justify-between items-center h-20">
          <button 
            onClick={onViewHome}
            className="font-display text-2xl md:text-3xl text-charcoal hover:text-charcoal-light transition-colors"
          >
            Artisan's Haven
          </button>
          
          <Authenticated>
            <nav className="hidden md:flex items-center space-x-12">
              <button 
                onClick={onViewHome}
                className="font-sans text-sm uppercase tracking-wider text-charcoal hover:text-sage transition-colors"
              >
                Home
              </button>
              <button 
                onClick={onViewCatalog}
                className="font-sans text-sm uppercase tracking-wider text-charcoal hover:text-sage transition-colors"
              >
                Shop
              </button>
              {isAdmin && onViewAdmin && (
                <button 
                  onClick={onViewAdmin}
                  className="font-sans text-sm uppercase tracking-wider text-charcoal hover:text-sage transition-colors"
                >
                  Admin
                </button>
              )}
              <button 
                onClick={onViewCart}
                className="text-charcoal hover:text-sage transition-colors"
              >
                <CartIcon />
              </button>
            </nav>
          </Authenticated>
          
          <div className="flex items-center space-x-6">
            <Authenticated>
              <div className="md:hidden flex items-center space-x-4">
                <button 
                  onClick={onViewCart}
                  className="text-charcoal hover:text-sage transition-colors"
                >
                  <CartIcon />
                </button>
              </div>
            </Authenticated>
            <SignOutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
