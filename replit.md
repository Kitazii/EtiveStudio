# Etive Studio Photography Website

## Overview

This is a modern, professional photography portfolio website built for Etive Studio. The application is a full-stack web application featuring a React frontend with a Node.js/Express backend, designed to showcase photography services and enable client contact through a contact form.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (via Neon serverless)
- **API Design**: RESTful API endpoints
- **Development**: Hot reload with tsx

### Design System
- **Typography**: Inter for body text, Playfair Display for headings
- **Color Scheme**: Professional black, white, and red brand colors
- **Component Library**: Custom components built on Radix UI primitives
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Key Components

### Database Schema
- **Contacts Table**: Stores client inquiries (name, email, message, timestamp)
- **Users Table**: Basic user structure for potential future admin features
- **Validation**: Zod schemas for runtime type checking and validation

### API Endpoints
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Retrieve all contacts (admin)

### Frontend Features
- **Hero Section**: Video background with call-to-action
- **About Section**: Statistics with animated counters
- **Brands Section**: Trusted client logos display
- **Portfolio Section**: YouTube video integration
- **Contact Form**: Validated form with success/error handling
- **Mobile Optimization**: Touch-friendly navigation and contact overlay

### UI Components
- Comprehensive component library built on Radix UI
- Form components with validation states
- Toast notifications for user feedback
- Mobile-responsive navigation
- Animated counters and parallax effects

## Data Flow

1. **Client Interaction**: Users browse portfolio and fill out contact form
2. **Form Submission**: React Hook Form validates data using Zod schemas
3. **API Request**: TanStack Query sends validated data to Express API
4. **Database Storage**: Drizzle ORM stores contact information in PostgreSQL
5. **User Feedback**: Toast notifications confirm successful submission

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Runtime type validation
- **@radix-ui/***: Accessible UI primitives

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundling for production
- **tailwindcss**: Utility-first CSS framework
- **vite**: Fast build tool and dev server

### Third-party Services
- **Neon Database**: Serverless PostgreSQL hosting
- **YouTube**: Video hosting for portfolio content
- **Clearbit**: Logo API for brand section

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds optimized static assets to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations handle schema changes

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)

### Deployment Commands
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm start`: Production server
- `npm run db:push`: Apply database schema changes

## Changelog
- July 02, 2025. Initial setup

## User Preferences
Preferred communication style: Simple, everyday language.