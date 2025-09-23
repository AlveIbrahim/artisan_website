export function Artists() {
  return (
    <section className="section-padding bg-soft-gray">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">
            Meet the
            <span className="block text-sage italic">artisans</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto text-balance">
            Behind every piece is a passionate creator dedicated to preserving 
            traditional techniques while embracing contemporary expression.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Artist 1 */}
          <div className="text-center">
            <div className="aspect-square bg-medium-gray mb-6 rounded-sm overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-6xl text-charcoal-light">M</span>
              </div>
            </div>
            <h3 className="heading-sm mb-2">Maria Santos</h3>
            <p className="body-sm text-charcoal-light uppercase tracking-wider mb-3">
              Ceramic Artist
            </p>
            <p className="body-sm text-charcoal-light leading-relaxed">
              Drawing inspiration from her grandmother's pottery traditions, 
              Maria creates vessels that bridge ancient techniques with modern aesthetics.
            </p>
          </div>

          {/* Artist 2 */}
          <div className="text-center">
            <div className="aspect-square bg-medium-gray mb-6 rounded-sm overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-6xl text-charcoal-light">J</span>
              </div>
            </div>
            <h3 className="heading-sm mb-2">James Chen</h3>
            <p className="body-sm text-charcoal-light uppercase tracking-wider mb-3">
              Woodworker
            </p>
            <p className="body-sm text-charcoal-light leading-relaxed">
              With over two decades of experience, James transforms sustainably 
              sourced wood into functional art that celebrates natural grain patterns.
            </p>
          </div>

          {/* Artist 3 */}
          <div className="text-center">
            <div className="aspect-square bg-medium-gray mb-6 rounded-sm overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-6xl text-charcoal-light">A</span>
              </div>
            </div>
            <h3 className="heading-sm mb-2">Amara Okafor</h3>
            <p className="body-sm text-charcoal-light uppercase tracking-wider mb-3">
              Textile Designer
            </p>
            <p className="body-sm text-charcoal-light leading-relaxed">
              Specializing in hand-woven fabrics, Amara combines traditional 
              African weaving methods with contemporary color palettes and patterns.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <button className="btn-outline">
            Meet All Artists
          </button>
        </div>
      </div>
    </section>
  );
}
