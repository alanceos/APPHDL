import { COMPANY_INFO, NAV_LINKS } from '@/data/constants';

export default function Footer() {
  return (
    <footer className="bg-wine-red text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-serif mb-6 text-gold">Estate de Vino</h3>
            <p className="max-w-xs mb-6">A legacy of exceptional winemaking since 1892, where tradition meets innovation in every bottle.</p>
            <div className="flex space-x-4">
              <a href={COMPANY_INFO.social.instagram} className="text-white hover:text-gold transition-colors duration-300" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href={COMPANY_INFO.social.facebook} className="text-white hover:text-gold transition-colors duration-300" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={COMPANY_INFO.social.twitter} className="text-white hover:text-gold transition-colors duration-300" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={COMPANY_INFO.social.pinterest} className="text-white hover:text-gold transition-colors duration-300" aria-label="Pinterest">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          <div className="mb-8 md:mb-0">
            <h4 className="text-lg font-serif mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="hover:text-gold transition-colors duration-300"
                  >
                    {link.name === 'RESERVE' ? 'Reservations' : link.name.charAt(0) + link.name.slice(1).toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-8 md:mb-0">
            <h4 className="text-lg font-serif mb-4 text-gold">Visit Us</h4>
            <address className="not-italic">
              <p className="mb-2">{COMPANY_INFO.address.split(',')[0]}</p>
              <p className="mb-2">{COMPANY_INFO.address.split(',')[1]}, {COMPANY_INFO.address.split(',')[2]}</p>
              <p className="mb-4">{COMPANY_INFO.phone}</p>
              <p>
                <a 
                  href={`mailto:${COMPANY_INFO.email}`} 
                  className="hover:text-gold transition-colors duration-300"
                >
                  {COMPANY_INFO.email}
                </a>
              </p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-4 text-gold">Newsletter</h4>
            <p className="mb-4 max-w-xs">Subscribe to receive updates on new releases, events, and special offers.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 w-full text-deep-brown focus:outline-none"
                aria-label="Email for newsletter"
              />
              <button 
                type="submit" 
                className="bg-gold text-deep-brown px-4 hover:bg-white transition-colors duration-300"
                aria-label="Subscribe to newsletter"
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gold/30 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Estate de Vino. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gold transition-colors duration-300 text-sm">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors duration-300 text-sm">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors duration-300 text-sm">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
