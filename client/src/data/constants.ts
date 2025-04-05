// Color constants
export const COLORS = {
  wineRed: '#722F37',
  gold: '#C7B07B',
  deepBrown: '#2C1810',
  saddleBrown: '#8B4513',
  cream: '#F8F5F0',
  white: '#FFFFFF',
  black: '#000000',
};

// Company information
export const COMPANY_INFO = {
  name: 'Hacienda de Letras',
  address: 'Teodoro Olivares S/N, 20668 San Luis de Letras, Ags.',
  phone: '(449) 973-5421',
  email: 'contacto@haciendadeletras.mx',
  hours: {
    toursTastings: 'Martes a Domingo 10am - 5pm',
    restaurant: 'Jueves a Domingo 1pm - 9pm',
    wineShop: 'Martes a Domingo 10am - 6pm',
  },
  social: {
    instagram: 'https://instagram.com/haciendadeletras',
    facebook: 'https://facebook.com/haciendadeletras',
    twitter: 'https://twitter.com/hdeletras',
    pinterest: 'https://pinterest.com/haciendadeletras',
  }
};

// Navigation links
export const NAV_LINKS = [
  { name: 'NUESTRA HISTORIA', href: '#story' },
  { name: 'EXPERIENCIAS', href: '#experiences' },
  { name: 'VINOS', href: '#wines' },
  { name: 'VIÑEDO', href: '#vineyard' },
  { name: 'EVENTOS', href: '#events' },
  { name: 'CONTACTO', href: '#contact' },
  { name: 'RESERVAR', href: '#reserve', isButton: true },
];

// Image sources for parallax sections
export const IMAGES = {
  // Imágenes principales
  hero: '/images/hero/vineyard-sunset.jpg', // Viñedo al atardecer
  story: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb', // Barricas en bodega histórica
  parallax: 'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6', // Cava con barricas iluminada

  // Experiencias
  tasting: '/images/experiences/wine-tasting.jpg', // Cata profesional
  harvestSeason: '/images/experiences/harvest-celebration.jpg', // Fiesta de la vendimia
  dinnerPairing: '/images/experiences/dinner-pairing.jpg', // Cena maridaje
  winemaking: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b', // Proceso de vinificación
  pairing: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d', // Maridaje gourmet

  // Vinos
  redWines: 'https://images.unsplash.com/photo-1474722883634-d5a4a911faf9', // Vino tinto premium
  whiteWines: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d', // Vino blanco
  reserveWines: 'https://images.unsplash.com/photo-1506377585622-bedcbb5a8251', // Colección reserva

  // Viñedo y proceso
  vineyardAerial: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7', // Vista aérea
  wineProduction: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553', // Tanques de producción

  // Eventos y celebraciones
  wineEvent: 'https://images.unsplash.com/photo-1567529684892-09290a1b2d05', // Evento de cata
  celebration: 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db', // Celebración
  winePouring: 'https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf', // Servicio de vino

  // Experiencias especiales
  barrelRoom: 'https://images.unsplash.com/photo-1507667522877-ad03f0c7b0e0', // Sala de barricas
  sunsetTasting: 'https://images.unsplash.com/photo-1506377585622-bedcbb5a8251', // Cata al atardecer

  // Mapa interactivo del viñedo
  vineyardMap: 'https://images.unsplash.com/photo-1559403823-9c8ec02157f1', // Vista del viñedo
};

// Datos para el mapa interactivo del viñedo
export const VINEYARD_LOCATIONS = {
  mainAreas: [
    {
      id: 'vinedo-principal',
      name: 'Viñedo Principal',
      description: 'Nuestro viñedo emblemático con más de 20 hectáreas de uvas premium.',
      coordinates: { x: 50, y: 50 },
      icon: '🍇',
      details: {
        'Variedades': ['Cabernet Sauvignon', 'Merlot', 'Tempranillo'],
        'Extensión': '20 hectáreas',
        'Altitud': '2,200 metros',
        'Edad promedio': '15 años'
      }
    },
    {
      id: 'bodega',
      name: 'Bodega de Añejamiento',
      description: 'Bodega subterránea donde nuestros vinos maduran en barricas de roble francés.',
      coordinates: { x: 30, y: 40 },
      icon: '🏺',
      details: {
        'Capacidad': '500 barricas',
        'Temperatura': '15°C constante',
        'Humedad': '75%',
        'Tipos de barrica': ['Roble francés', 'Roble americano']
      }
    }
  ],
  pointsOfInterest: [
    {
      id: 'sala-cata',
      name: 'Sala de Cata',
      description: 'Espacio exclusivo para degustaciones y experiencias enológicas.',
      coordinates: { x: 70, y: 30 },
      icon: '🍷',
      details: {
        'Capacidad': '30 personas',
        'Servicios': ['Catas guiadas', 'Maridajes', 'Cursos de vino'],
        'Horario': '11:00 - 18:00'
      }
    },
    {
      id: 'terraza',
      name: 'Terraza Panorámica',
      description: 'Mirador con vistas espectaculares al viñedo y las montañas.',
      coordinates: { x: 80, y: 60 },
      icon: '🌅',
      details: {
        'Capacidad': '50 personas',
        'Eventos': ['Cenas maridaje', 'Sunset tastings', 'Eventos privados'],
        'Mejor hora': 'Atardecer'
      }
    }
  ]
};

export const IMAGE_DIMENSIONS = {
  hero: {
    width: 2000,
    height: 1200,
    priority: true
  },
  thumbnail: {
    width: 800,
    height: 600,
    priority: false
  },
  gallery: {
    width: 1600,
    height: 1067,
    priority: false
  }
};

export const FEATURED_WINES = [
  {
    id: '1',
    title: 'Cabernet Sauvignon Reserva',
    description: 'Un vino tinto elegante con notas de frutos rojos maduros, vainilla y un toque de roble. Final largo y sedoso.',
    imageUrl: '/images/wines/Cabernet-Sauvignon-Reserva.jpg',
    vintage: '2019',
    varietal: 'Cabernet Sauvignon',
    price: '$850 MXN',
    isReserve: true,
    href: '/vinos/cabernet-sauvignon-reserva'
  },
  {
    id: '2',
    title: 'Chardonnay Premium',
    description: 'Vino blanco con aromas a frutas tropicales, manzana verde y notas minerales. Fresco y equilibrado en boca.',
    imageUrl: '/images/wines/Chardonnay-Premium.jpg',
    vintage: '2021',
    varietal: 'Chardonnay',
    price: '$680 MXN',
    isReserve: false,
    href: '/vinos/chardonnay-premium'
  },
  {
    id: '3',
    title: 'Merlot Gran Reserva',
    description: 'Vino tinto de gran cuerpo con notas de ciruela, chocolate negro y especias. Taninos suaves y aterciopelados.',
    imageUrl: '/images/wines/Merlot-Gran-Reserva.jpg',
    vintage: '2018',
    varietal: 'Merlot',
    price: '$980 MXN',
    isReserve: true,
    href: '/vinos/merlot-gran-reserva'
  }
];

export const FEATURED_EXPERIENCES = [
  {
    id: '1',
    title: 'Degustación Premium',
    description: 'Un viaje íntimo por nuestra colección premium, guiado por enólogos expertos.',
    imageUrl: '/images/experiences/wine-tasting.jpg',
    duration: '90 minutes',
    price: '$850 MXN',
    rating: 5,
    reviews: 124,
    href: '/experiencias/degustacion-premium'
  },
  {
    id: '2',
    title: 'Fiesta de la Vendimia',
    description: 'Participa en nuestra tradicional celebración de la cosecha con música, baile y los mejores vinos.',
    imageUrl: '/images/experiences/harvest-celebration.jpg',
    duration: '240 minutes',
    price: '$1,200 MXN',
    rating: 4.5,
    reviews: 98,
    href: '/experiencias/fiesta-vendimia'
  },
  {
    id: '3',
    title: 'Cena Maridaje bajo las Estrellas',
    description: 'Una experiencia gastronómica exclusiva en nuestros viñedos iluminados bajo el cielo nocturno.',
    imageUrl: '/images/experiences/dinner-pairing.jpg',
    duration: '180 minutes',
    price: '$1,500 MXN',
    rating: 5,
    reviews: 86,
    href: '/experiencias/cena-maridaje'
  }
];
