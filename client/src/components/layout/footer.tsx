import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { COMPANY_INFO } from '@/data/constants';

export default function Footer() {
  return (
    <footer className="bg-deep-brown text-cream py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Logo y descripción */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-serif text-gold mb-4">Hacienda de Letras</h3>
            <p className="text-cream/80 mb-4 max-w-sm">
              Tradición vinícola y celebración en cada copa. Descubre nuestros exquisitos vinos
              que elevan cada evento y momento especial a través de aromas y sabores únicos.
            </p>
            <div className="flex space-x-4">
              <a 
                href={COMPANY_INFO.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cream hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={COMPANY_INFO.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cream hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={COMPANY_INFO.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cream hover:text-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </motion.div>
          
          {/* Enlaces rápidos */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-serif text-gold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#story" className="text-cream/80 hover:text-gold transition-colors">
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a href="/#experiences" className="text-cream/80 hover:text-gold transition-colors">
                  Experiencias
                </a>
              </li>
              <li>
                <a href="/#wines" className="text-cream/80 hover:text-gold transition-colors">
                  Vinos
                </a>
              </li>
              <li>
                <a href="/#vineyard" className="text-cream/80 hover:text-gold transition-colors">
                  Viñedo
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-cream/80 hover:text-gold transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Información de contacto */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-serif text-gold mb-4">Visítanos</h4>
            <address className="not-italic text-cream/80 mb-4">
              <p>{COMPANY_INFO.address}</p>
              <p className="mt-2">
                <span className="block">Teléfono: {COMPANY_INFO.phone}</span>
                <span className="block">Email: {COMPANY_INFO.email}</span>
              </p>
            </address>
            <div className="text-cream/80">
              <h5 className="font-medium text-gold text-sm mt-4">Horarios:</h5>
              <p className="text-sm">Degustaciones: {COMPANY_INFO.hours.toursTastings}</p>
              <p className="text-sm">Restaurante: {COMPANY_INFO.hours.restaurant}</p>
              <p className="text-sm">Tienda: {COMPANY_INFO.hours.wineShop}</p>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="border-t border-cream/20 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-cream/60 text-sm">
              &copy; {new Date().getFullYear()} Hacienda de Letras. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-cream/60">
              <a href="#" className="hover:text-gold transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-gold transition-colors">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}