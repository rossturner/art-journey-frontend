# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a React frontend for an art portfolio website built with:
- **Vite** for build tooling and development server
- **Mantine** UI library with dark theme as default
- **React Router** with HashRouter for client-side routing
- **date-fns** for date formatting and manipulation

### Key Architectural Patterns

**Data Flow**: The application fetches art project data from a PHP backend via the `useWorkspace` hook, which calls `/workspace/workspace-index.php` and processes the response to:
- Parse project dates and format them consistently
- Clean title formatting (removes leading numbers)
- Sort projects by date (newest first)
- Group projects by year/month

**Routing Structure**:
- `/` - Home gallery page
- `/aspirations` - Aspirations showcase
- `/art-trends-calendar` - Art trends calendar view
- `/:year/:month/:slug` - Individual project pages

**Development Setup**: 
- Uses Vite proxy to redirect `/workspace` requests to `https://ziedritz.art` during development
- ESLint configured for React with hooks and refresh plugins
- Mantine components imported globally with CSS normalization

### Important Files

- `src/hooks/useWorkspace.js` - Central data fetching and processing logic
- `src/App.jsx` - Main routing and navigation structure
- `vite.config.js` - Contains proxy configuration for backend API
- `workspace-index.php` - PHP backend file (hosted separately) that provides project data

### Static Assets

The `public/static/` directory contains project images organized by category (aspirations, events). The workspace system expects specific directory structures for art projects organized by year/month/project-slug.