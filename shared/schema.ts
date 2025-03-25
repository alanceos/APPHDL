import { pgTable, text, serial, integer, boolean, timestamp, numeric, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Wine schema
export const wines = pgTable("wines", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  vintage: text("vintage").notNull(),
  category: text("category").notNull(), // 'red', 'white', 'reserve', etc.
  price: numeric("price").notNull(),
  rating: numeric("rating").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  isReserve: boolean("is_reserve").default(false),
  pairings: text("pairings").array().notNull(),
});

export const insertWineSchema = createInsertSchema(wines).omit({
  id: true,
});

// Experience schema
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  duration: integer("duration").notNull(), // in minutes
  price: numeric("price").notNull(),
  imageUrl: text("image_url").notNull(),
  ratings: numeric("ratings").notNull(),
  reviewCount: integer("review_count").notNull(),
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
});

// Vineyard areas schema
export const vineyardAreas = pgTable("vineyard_areas", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'vineyards', 'facilities', etc.
  icon: text("icon").notNull(), // Font Awesome icon class
  position: jsonb("position").notNull(), // {x: number, y: number}
  color: text("color").notNull(), // Background color for marker
});

export const insertVineyardAreaSchema = createInsertSchema(vineyardAreas).omit({
  id: true,
});

// Reservation schema
export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  experienceId: integer("experience_id").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  guests: integer("guests").notNull(),
  specialRequests: text("special_requests"),
  totalPrice: numeric("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default("confirmed").notNull(), // 'confirmed', 'cancelled', 'pending'
});

export const insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
  createdAt: true,
});

// Contact message schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isRead: boolean("is_read").default(false),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
  isRead: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Wine = typeof wines.$inferSelect;
export type InsertWine = z.infer<typeof insertWineSchema>;

export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;

export type VineyardArea = typeof vineyardAreas.$inferSelect;
export type InsertVineyardArea = z.infer<typeof insertVineyardAreaSchema>;

export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
