import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SectionDivider } from "./SectionDivider";

interface CategoriesProps {
  onViewCategory: (category: string) => void;
}

export function Categories({ onViewCategory }: CategoriesProps) {
  const categories = useQuery(api.categories.list);

  // Default categories if none exist
  const defaultCategories = [
    { name: "ceramics", description: "Handthrown pottery and sculptural pieces" },
    { name: "textiles", description: "Woven fabrics and fiber art" },
    { name: "jewelry", description: "Handcrafted precious metal work" },
    { name: "woodwork", description: "Carved and turned wooden objects" },
  ];

  const displayCategories = categories && categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="relative">
      <section className="section-padding bg-warm-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6">
              Shop by Craft
            </h2>
            <p className="body-lg max-w-2xl mx-auto text-balance">
              Explore our carefully organized collections, each representing 
              a different artisanal tradition and technique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayCategories.map((category, index) => (
              <button
                key={category.name || index}
                onClick={() => onViewCategory(category.name)}
                className="group text-left"
              >
                <div className="aspect-square bg-soft-gray mb-6 flex items-center justify-center
                               group-hover:bg-medium-gray transition-colors">
                  <span className="font-display text-4xl text-charcoal-light">
                    {category.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="heading-sm mb-2 group-hover:text-sage transition-colors">
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </h3>
                <p className="body-sm text-charcoal-light">
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Curved divider */}
      <SectionDivider variant="wave2" flip={true} color="soft-gray" />
    </div>
  );
}
