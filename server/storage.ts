import {
  users, User, InsertUser,
  wines, Wine, InsertWine,
  experiences, Experience, InsertExperience,
  vineyardAreas, VineyardArea, InsertVineyardArea,
  reservations, Reservation, InsertReservation,
  contactMessages, ContactMessage, InsertContactMessage
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Wine operations
  getWines(): Promise<Wine[]>;
  getWineById(id: number): Promise<Wine | undefined>;
  getWinesByCategory(category: string): Promise<Wine[]>;
  createWine(wine: InsertWine): Promise<Wine>;

  // Experience operations
  getExperiences(): Promise<Experience[]>;
  getExperienceById(id: number): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;

  // Vineyard area operations
  getVineyardAreas(): Promise<VineyardArea[]>;
  getVineyardAreaById(id: number): Promise<VineyardArea | undefined>;
  getVineyardAreasByType(type: string): Promise<VineyardArea[]>;
  createVineyardArea(area: InsertVineyardArea): Promise<VineyardArea>;

  // Reservation operations
  getReservations(): Promise<Reservation[]>;
  getReservationById(id: number): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;

  // Contact message operations
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private wines: Map<number, Wine>;
  private experiences: Map<number, Experience>;
  private vineyardAreas: Map<number, VineyardArea>;
  private reservations: Map<number, Reservation>;
  private contactMessages: Map<number, ContactMessage>;
  
  private userCount: number;
  private wineCount: number;
  private experienceCount: number;
  private vineyardAreaCount: number;
  private reservationCount: number;
  private contactMessageCount: number;

  constructor() {
    this.users = new Map();
    this.wines = new Map();
    this.experiences = new Map();
    this.vineyardAreas = new Map();
    this.reservations = new Map();
    this.contactMessages = new Map();
    
    this.userCount = 1;
    this.wineCount = 1;
    this.experienceCount = 1;
    this.vineyardAreaCount = 1;
    this.reservationCount = 1;
    this.contactMessageCount = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  private initSampleData() {
    // Create sample experiences
    this.createExperience({
      name: "Degustación Premium",
      shortDescription: "Un viaje íntimo por nuestra colección premium, guiado por enólogos expertos.",
      description: "Disfruta de una cata cuidadosamente seleccionada de seis vinos de Hacienda de Letras, incluyendo nuestras reservas limitadas. Nuestros expertos te guiarán a través de las características únicas de cada vino mientras descubres los secretos del maridaje perfecto en un ambiente exclusivo.",
      duration: 90,
      price: "85",
      imageUrl: "https://images.pexels.com/photos/5380640/pexels-photo-5380640.jpeg",
      ratings: "5.0",
      reviewCount: 124
    });

    this.createExperience({
      name: "Fiesta de la Vendimia",
      shortDescription: "Participa en nuestra tradicional celebración de la cosecha con música, baile y los mejores vinos.",
      description: "Sumérgete en nuestra celebración anual de la vendimia, donde podrás participar en la cosecha y pisado tradicional de la uva. Disfruta de música en vivo, bailes regionales y una gran parrillada acompañada de nuestros mejores vinos. Una fiesta para todos los sentidos que celebra la rica tradición vitivinícola de nuestra región.",
      duration: 240,
      price: "120",
      imageUrl: "https://images.pexels.com/photos/5275085/pexels-photo-5275085.jpeg",
      ratings: "4.8",
      reviewCount: 98
    });

    this.createExperience({
      name: "Cena Maridaje bajo las Estrellas",
      shortDescription: "Una experiencia gastronómica exclusiva en nuestros viñedos iluminados bajo el cielo nocturno.",
      description: "Vive una velada inolvidable con un menú degustación de cinco tiempos, donde cada plato está magistralmente maridado con uno de nuestros vinos premium. La cena se realiza en nuestro viñedo principal, decorado con luces y antorchas, creando un ambiente mágico bajo las estrellas con música en vivo de fondo.",
      duration: 180,
      price: "195",
      imageUrl: "https://images.pexels.com/photos/3656118/pexels-photo-3656118.jpeg",
      ratings: "5.0",
      reviewCount: 86
    });

    // Create sample wines
    this.createWine({
      name: "Gran Reserva Hacienda",
      vintage: "2015",
      category: "tinto reserva",
      price: "125",
      rating: "4.9",
      description: "Nuestro vino insignia, con notas de grosella negra, cedro y vainilla con taninos firmes y un final elegante y persistente. Perfecto para celebraciones especiales y momentos que merecen ser recordados.",
      imageUrl: "https://images.pexels.com/photos/7246427/pexels-photo-7246427.jpeg",
      isReserve: true,
      pairings: ["Cordero", "Chocolate Amargo", "Carnes Añejadas"]
    });

    this.createWine({
      name: "Chardonnay Celebración",
      vintage: "2020",
      category: "blanco",
      price: "65",
      rating: "4.7",
      description: "Aromas de limón, manzana y roble tostado con una textura cremosa y acidez equilibrada. El complemento perfecto para encuentros sociales y celebraciones al aire libre.",
      imageUrl: "https://images.pexels.com/photos/6984096/pexels-photo-6984096.jpeg",
      isReserve: false,
      pairings: ["Mariscos", "Aves", "Pasta con Crema"]
    });

    this.createWine({
      name: "Pinot Noir Fiesta",
      vintage: "2019",
      category: "tinto",
      price: "85",
      rating: "4.8",
      description: "Delicados aromas de cereza, frambuesa y sutiles especias con taninos sedosos y un final elegante. Un vino versátil ideal para acompañar eventos sociales y reuniones entre amigos.",
      imageUrl: "https://images.pexels.com/photos/8471739/pexels-photo-8471739.jpeg",
      isReserve: false,
      pairings: ["Salmón", "Pato", "Platos con Hongos"]
    });

    // Create sample vineyard areas
    this.createVineyardArea({
      name: "Viñedo Principal",
      description: "Nuestras vides más antiguas, plantadas en 1978 en una ladera orientada al sur con drenaje ideal. El terroir perfecto para nuestros vinos más emblemáticos y sede de nuestros principales eventos al aire libre.",
      type: "vineyards",
      icon: "fa-wine-bottle",
      position: {x: 30, y: 25},
      color: "#722F37" // wine-red
    });

    this.createVineyardArea({
      name: "Bodega & Centro de Eventos",
      description: "Nuestra instalación de vanguardia donde la artesanía tradicional se encuentra con la innovación moderna. Con capacidad para grandes celebraciones y eventos corporativos en un entorno único.",
      type: "facilities",
      icon: "fa-home",
      position: {x: 40, y: 60},
      color: "#C7B07B" // gold
    });

    this.createVineyardArea({
      name: "Sala de Degustación VIP",
      description: "Nuestra elegante sala de cata ofrece vistas panorámicas y una experiencia inmersiva de degustación guiada por expertos. El espacio perfecto para pequeñas celebraciones y eventos exclusivos.",
      type: "facilities",
      icon: "fa-glass-cheers",
      position: {x: 20, y: 40},
      color: "#8B4513" // saddle-brown
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userCount++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  // Wine operations
  async getWines(): Promise<Wine[]> {
    return Array.from(this.wines.values());
  }

  async getWineById(id: number): Promise<Wine | undefined> {
    return this.wines.get(id);
  }

  async getWinesByCategory(category: string): Promise<Wine[]> {
    if (category === 'all') {
      return Array.from(this.wines.values());
    }
    return Array.from(this.wines.values()).filter(
      (wine) => wine.category.includes(category)
    );
  }

  async createWine(wine: InsertWine): Promise<Wine> {
    const id = this.wineCount++;
    // Ensure isReserve is not undefined
    const newWine = { 
      ...wine, 
      id, 
      isReserve: wine.isReserve || null 
    };
    this.wines.set(id, newWine);
    return newWine;
  }

  // Experience operations
  async getExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values());
  }

  async getExperienceById(id: number): Promise<Experience | undefined> {
    return this.experiences.get(id);
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    const id = this.experienceCount++;
    const newExperience = { ...experience, id };
    this.experiences.set(id, newExperience);
    return newExperience;
  }

  // Vineyard area operations
  async getVineyardAreas(): Promise<VineyardArea[]> {
    return Array.from(this.vineyardAreas.values());
  }

  async getVineyardAreaById(id: number): Promise<VineyardArea | undefined> {
    return this.vineyardAreas.get(id);
  }

  async getVineyardAreasByType(type: string): Promise<VineyardArea[]> {
    if (type === 'all') {
      return Array.from(this.vineyardAreas.values());
    }
    return Array.from(this.vineyardAreas.values()).filter(
      (area) => area.type === type
    );
  }

  async createVineyardArea(area: InsertVineyardArea): Promise<VineyardArea> {
    const id = this.vineyardAreaCount++;
    const newArea = { ...area, id };
    this.vineyardAreas.set(id, newArea);
    return newArea;
  }

  // Reservation operations
  async getReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values());
  }

  async getReservationById(id: number): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const id = this.reservationCount++;
    const newReservation = { 
      ...reservation, 
      id, 
      createdAt: new Date(),
      specialRequests: reservation.specialRequests || null,
      status: reservation.status || "confirmed"
    };
    this.reservations.set(id, newReservation);
    return newReservation;
  }

  // Contact message operations
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCount++;
    const newMessage = { 
      ...message, 
      id, 
      createdAt: new Date(), 
      isRead: false 
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (message) {
      const updatedMessage = { ...message, isRead: true };
      this.contactMessages.set(id, updatedMessage);
      return updatedMessage;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
