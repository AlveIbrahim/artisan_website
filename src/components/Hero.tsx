import { SectionDivider } from "./SectionDivider";

interface HeroProps {
  onViewCatalog: () => void;
}

export function Hero({ onViewCatalog }: HeroProps) {
  return (
    <div className="relative">
      <section className="relative bg-soft-gray section-padding min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/Q4dYfEl.png" 
            alt="Artisan crafting pottery"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-soft-gray/60"></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="max-w-4xl">
            <h1 className="heading-xl mb-8 text-balance">
              Handcrafted with
              <span className="block text-sage italic">intention</span>
            </h1>
            <p className="body-lg mb-12 max-w-2xl text-balance">
              Each piece in our collection tells a story of artisanal mastery, 
              sustainable practices, and timeless design. Discover objects that 
              bring beauty and meaning to everyday life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onViewCatalog}
                className="btn-primary text-base px-8 py-4"
              >
                Explore Collection
              </button>
              <button className="btn-outline text-base px-8 py-4">
                Our Story
              </button>
            </div>
          </div>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-sage rounded-full opacity-60 hidden lg:block z-10"></div>
        <div className="absolute bottom-32 right-32 w-1 h-1 bg-terracotta rounded-full opacity-40 hidden lg:block z-10"></div>
        <div className="absolute top-1/2 right-16 w-px h-16 bg-sage opacity-30 hidden lg:block z-10"></div>
      </section>
      
      {/* Curved divider */}
      <div className="-mt-8 md:-mt-12">
        <SectionDivider variant="wave1" color="white" flip={true} />
      </div>
    </div>
  );
}
