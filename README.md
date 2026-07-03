# PFI TTECH

Proyecto Final Integrador para Talento Tech. E-commerce digital.

## Stack

| Capa | Tecnologías |
|------|-------------|
| Frontend | React 19, React Router 7, Tailwind CSS 4, Vite 8 |
| Backend | Node.js, Express 5, Firebase / Firebase Admin |
| Auth | JWT + bcrypt |
| Docs | Swagger (`/api/docs`) |
| Deploy | Vercel |

## Estructura

```
PFI TTECH/
├── backend/
   ├── src/
   │   ├── controllers/
   │   ├── middleware/
   │   ├── models/
   │   ├── routes/
   │   ├── services/
   │   └── swagger.js
   └── index.js

```

## Setup local

### Requisitos
- Node.js 18+
- pnpm

### Instalar dependencias

pnpm install

### Ejecutar

cd backend
pnpm start



API: `http://localhost:3000`  
Docs: `http://localhost:3000/api/docs`

## Licencia

MIT
