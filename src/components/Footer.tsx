export function Footer() {
  return (
    <footer className="bg-charcoal text-warm-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl mb-6">Artisan's Haven</h3>
            <p className="body-md text-gray-300 max-w-md leading-relaxed">
              Connecting you with exceptional artisans and their handcrafted creations. 
              Each piece tells a story of tradition, skill, and passion.
            </p>
          </div>
          
          <div>
            <h4 className="font-sans font-medium uppercase tracking-wider text-sm mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-warm-white transition-colors body-sm">All Pieces</a></li>
              <li><a href="#" className="text-gray-300 hover:text-warm-white transition-colors body-sm">Ceramics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-warm-white transition-colors body-sm">Textiles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-warm-white transition-colors body-sm">Jewelry</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans font-medium uppercase tracking-wider text-sm mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-warm-white transition-colors body-sm">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-warm-white transition-colors body-sm">Artists</a></li>
              <li><a href="#" className="text-gray-300 hover:text-warm-white transition-colors body-sm">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-warm-white transition-colors body-sm">Newsletter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 body-sm">
            © 2024 Artisan's Haven. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-warm-white transition-colors body-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-warm-white transition-colors body-sm">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
