# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
# 🧾 Cotizador Frontend Remix

> Interfaz web del cotizador con Remix SSR, Supabase y Sanity.  
> Guía al usuario en un wizard para cotizar servicios, mostrar precios y generar PDFs.  
> Accesible, rápido y editable sin despliegues.

---

## 📖 Descripción

El **Cotizador Frontend Remix** es la interfaz del *Cotizador Web Inteligente*, una herramienta que permite generar propuestas comerciales personalizadas de forma rápida, estructurada y trazable.

Desarrollado con **Remix (TypeScript)**, implementa un **wizard interactivo** de 4 a 6 pasos que guía al usuario desde la selección de servicios hasta la descarga del PDF.  
Su arquitectura **SSR (Server-Side Rendering)** mejora el SEO, el rendimiento y la experiencia en cualquier dispositivo.

La aplicación utiliza **Supabase** como backend de datos y autenticación, y **Sanity** como CMS headless para textos y contenidos editoriales, editable sin despliegues técnicos.

El sistema cumple con **WCAG 2.1**, es mobile-first y registra métricas como tiempo de cotización, tasa de finalización y abandono.  
Se prueba con **Jest** y **Playwright**, y la CI/CD con **GitHub Actions** automatiza pruebas y builds antes de cada release.

Este frontend se comunica con el backend **Django + DRF**, que maneja la lógica de precios, PDFs y sincronización con **Vtiger CRM**.

---

## 🧩 Diagrama de arquitectura

```mermaid
flowchart TD
    A["Usuarios / Navegadores (Mobile y Desktop)"] -->|HTTP / HTTPS| B["Frontend SSR Remix (TS)\nRutas anidadas - Loaders/Actions - Accesibilidad"]
    B -->|API REST| C["Backend de Negocio\nDjango + DRF\n- Pricing avanzado\n- PDFs (Storage)\n- Jobs/Colas (Celery/Redis)"]
    B -->|PostgREST / SQL| D["Backend de Datos\nSupabase (PostgreSQL/Auth/Storage)\n- RLS - JSONB - Realtime - Firma de URLs"]
    B -->|GROQ| E["CMS Headless\nSanity\n- Contenido editorial\n- Textos del Wizard\n- Landing/FAQs/Legales"]
    C -->|Webhooks| F["CRM\nVtiger\n- Oportunidades - Actividades - Sincronizacion"]
    D -->|Sync / Storage| G["Observabilidad y Entrega\nSentry - Analytics - CI/CD (GitHub Actions)\nVPS/Node (SSR) + VPS/PaaS (Django)"]
    E -->|Build-time / Runtime| G
