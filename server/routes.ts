import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";
import { CONTACT_LINKS } from "./models/contact";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);

      // Send email notification
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        tls: {
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      });

      await transporter.sendMail({
        from: `"Website Contact" <${process.env.SMTP_USER}>`,
        to: CONTACT_LINKS.email, // or CONTACT_LINKS.email if imported
        subject: "New Contact Form Submission",
        text: `
          Name: ${contactData.name}
          Email: ${contactData.email}
          Message: ${contactData.message}
        `,
      });

      const contact = await storage.createContact(contactData);
      
      res.json({ success: true, contact });
    } catch (error) {
       console.error("Email error:", error); // Add this line
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contacts" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
