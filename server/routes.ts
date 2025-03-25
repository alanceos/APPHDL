import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertReservationSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup API routes
  // Note: Express router is not being used here because we're defining routes directly on app

  // Get all experiences
  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  // Get experience by ID
  app.get("/api/experiences/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const experience = await storage.getExperienceById(Number(id));
      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json(experience);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experience" });
    }
  });

  // Get all wines
  app.get("/api/wines", async (req, res) => {
    try {
      const { category } = req.query;
      let wines;
      if (category) {
        wines = await storage.getWinesByCategory(category as string);
      } else {
        wines = await storage.getWines();
      }
      res.json(wines);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wines" });
    }
  });

  // Get wine by ID
  app.get("/api/wines/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const wine = await storage.getWineById(Number(id));
      if (!wine) {
        return res.status(404).json({ message: "Wine not found" });
      }
      res.json(wine);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wine" });
    }
  });

  // Get all vineyard areas
  app.get("/api/vineyard-areas", async (req, res) => {
    try {
      const { type } = req.query;
      let areas;
      if (type) {
        areas = await storage.getVineyardAreasByType(type as string);
      } else {
        areas = await storage.getVineyardAreas();
      }
      res.json(areas);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vineyard areas" });
    }
  });

  // Create a new reservation
  app.post("/api/reservations", async (req, res) => {
    try {
      const validatedData = insertReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(validatedData);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ message: "Invalid reservation data", error });
    }
  });

  // Get reservation by ID
  app.get("/api/reservations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const reservation = await storage.getReservationById(Number(id));
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reservation" });
    }
  });

  // Create a new contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ 
        success: true, 
        id: message.id,
        message: "Thank you for your message. We will get back to you soon." 
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data", error });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
