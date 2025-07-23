# Tally Counter PWA

## Overview

This is a Progressive Web App (PWA) tally counter application built with modern web technologies. The app allows users to create, manage, and interact with multiple counters on mobile devices with offline capabilities and native app-like experience. The app features full dark mode support with theme switching capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: React hooks with localStorage persistence
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (configured but using in-memory storage currently)
- **Development**: Hot module replacement with Vite integration
- **Production**: ESBuild for server-side bundling

### PWA Features
- **Service Worker**: Custom service worker for offline caching
- **Manifest**: Web app manifest with proper icons and metadata
- **Mobile Optimization**: Responsive design optimized for mobile devices
- **Installable**: Can be installed as a native app on mobile devices
- **Dark Mode**: Full theme support with automatic system preference detection and manual override

## Key Components

### Data Layer
- **Schema**: Zod schemas for type-safe counter data validation
- **Storage**: Currently using in-memory storage with localStorage persistence on frontend
- **Database Ready**: Drizzle ORM configured for PostgreSQL integration

### UI Components
- **Counter Cards**: Interactive counter displays with increment/decrement controls
- **Create Counter Sheet**: Bottom sheet for adding new counters
- **Delete Dialog**: Confirmation dialog for counter deletion
- **Settings Sheet**: Theme selection interface with light/dark mode toggle
- **Theme Provider**: Context provider managing theme state and localStorage persistence
- **Toast Notifications**: User feedback system

### State Management
- **useCounters Hook**: Custom hook managing counter CRUD operations
- **localStorage Integration**: Automatic persistence of counter data
- **Optimistic Updates**: Immediate UI updates with error handling

## Data Flow

1. **Counter Creation**: User creates counter via bottom sheet → validates with Zod schema → persists to localStorage → updates UI
2. **Counter Updates**: User interactions (increment/decrement/reset) → immediate UI update → localStorage sync
3. **Counter Deletion**: User confirms deletion → removes from state → updates localStorage → UI refresh

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection (ready for deployment)
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing

### UI Dependencies
- **@radix-ui/**: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Type safety and enhanced developer experience
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with HMR and Express backend
- **Database**: In-memory storage with localStorage fallback
- **Hot Reloading**: Full-stack hot module replacement

### Production
- **Build Process**: Vite builds frontend, ESBuild bundles backend
- **Database**: Ready for PostgreSQL with Neon Database integration
- **Static Assets**: Optimized and cached for PWA performance
- **Service Worker**: Caches resources for offline functionality

### Migration Path
The application is architected to easily transition from localStorage-based storage to PostgreSQL:
1. Database schema already defined in `shared/schema.ts`
2. Drizzle configuration ready in `drizzle.config.ts`
3. Storage interface abstracted for easy swapping
4. Environment variables configured for database connection

The current implementation provides a fully functional PWA experience while maintaining the flexibility to scale to a full-stack application with persistent database storage.