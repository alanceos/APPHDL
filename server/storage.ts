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
      name: "Signature Tasting",
      shortDescription: "An intimate journey through our premium collection, guided by our expert sommeliers.",
      description: "Experience a carefully curated tasting of six Estate de Vino wines, including our limited reserve selections. Our expert sommeliers will guide you through each wine's unique characteristics and the stories behind them.",
      duration: 90,
      price: "85",
      imageUrl: "https://images.unsplash.com/photo-1506377295141-e428b38cf867",
      ratings: "5.0",
      reviewCount: 124
    });

    this.createExperience({
      name: "Estate Tour & Tasting",
      shortDescription: "Explore our historic cellars and vineyards followed by a curated tasting session.",
      description: "Begin with a guided tour of our historic vineyard and winemaking facilities, where you'll learn about our sustainable practices and legacy. The experience concludes with a tasting of our award-winning wines paired with local artisanal cheeses.",
      duration: 120,
      price: "120",
      imageUrl: "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52",
      ratings: "4.8",
      reviewCount: 98
    });

    this.createExperience({
      name: "Wine & Gastronomy",
      shortDescription: "A five-course seasonal meal expertly paired with our estate wines by our resident chef.",
      description: "Indulge in a culinary journey with our resident chef's seasonal five-course menu, each dish thoughtfully paired with our estate wines. This immersive dining experience showcases how our wines complement and enhance fine cuisine.",
      duration: 180,
      price: "195",
      imageUrl: "https://images.unsplash.com/photo-1432457990754-c8b5f21448de",
      ratings: "5.0",
      reviewCount: 86
    });

    // Create sample wines
    this.createWine({
      name: "Estate Reserve Cabernet Sauvignon",
      vintage: "2018",
      category: "red reserve",
      price: "125",
      rating: "4.9",
      description: "Notes of black currant, cedar, and vanilla with firm tannins and a long, elegant finish.",
      imageUrl: "https://images.unsplash.com/photo-1609951651556-5334e2706168",
      isReserve: true,
      pairings: ["Aged Steak", "Lamb", "Dark Chocolate"]
    });

    this.createWine({
      name: "Estate Chardonnay",
      vintage: "2020",
      category: "white",
      price: "65",
      rating: "4.7",
      description: "Aromas of lemon, apple, and toasted oak with a creamy texture and balanced acidity.",
      imageUrl: "https://images.unsplash.com/photo-1662488023079-5f27f180b8b4",
      isReserve: false,
      pairings: ["Seafood", "Poultry", "Creamy Pasta"]
    });

    this.createWine({
      name: "Estate Pinot Noir",
      vintage: "2019",
      category: "red",
      price: "85",
      rating: "4.8",
      description: "Delicate aromas of cherry, raspberry, and subtle spice with silky tannins and a graceful finish.",
      imageUrl: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6",
      isReserve: false,
      pairings: ["Salmon", "Duck", "Mushroom Dishes"]
    });

    // Create sample vineyard areas
    this.createVineyardArea({
      name: "Cabernet Vineyard",
      description: "Our oldest vines, planted in 1978 on a south-facing slope with ideal drainage.",
      type: "vineyards",
      icon: "fa-wine-bottle",
      position: {x: 30, y: 25},
      color: "#722F37" // wine-red
    });

    this.createVineyardArea({
      name: "Main Winery & Cellar",
      description: "Our state-of-the-art facility where traditional craftsmanship meets modern innovation.",
      type: "facilities",
      icon: "fa-home",
      position: {x: 40, y: 60},
      color: "#C7B07B" // gold
    });

    this.createVineyardArea({
      name: "Tasting Room",
      description: "Our elegant tasting room offers panoramic views and an immersive wine experience.",
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
