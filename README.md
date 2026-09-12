# 🌸 Blush Café — Café Website

A modern, responsive café website for a fictional café in Saheed Nagar, Bhubaneswar, built with a baby-pink and deep-rose theme, table reservations, and a working SMTP contact form.

## Industry
Restaurant / Café

## Objective
Build a beautiful, user-friendly café website with a real table reservation system and a full-stack contact form that emails enquiries to the café via SMTP.

## Technologies Used

**Frontend:** HTML5, CSS3, JavaScript, GSAP + ScrollTrigger, Leaflet.js (map), Inline SVG

**Backend:** Node.js, Express.js, MongoDB + Mongoose, Nodemailer (SMTP), CORS, dotenv

## Features
- Sticky nav with mobile menu, smooth scroll, 3D card tilt, scroll reveal animations
- Reviews slider, gallery lightbox, interactive Leaflet map
- **Table reservation** — saved to MongoDB, checks for duplicate date/time slots
- **Contact form (SMTP)** — validated on the backend, saved to MongoDB, and emailed to the café via Brevo SMTP + Nodemailer
- **Admin dashboard** — view, search, filter by status, update status, and delete contact enquiries

## Project Structure
```
blush-cafe-website/
├── frontend/
│   ├── index.html, style.css, script.js
│   └── images (logo, food photos, etc.)
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── src/models/
│       ├── Reservation.js
│       └── Contact.js
├── admin/
│   └── admin.html
└── README.md
```

## API Endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/test` | Health check |
| POST | `/api/reservations` | Create a table reservation |
| GET | `/api/reservations` | List all reservations |
| POST | `/api/contact` | Submit a contact enquiry — validates, saves to MongoDB, sends an email via SMTP |
| GET | `/api/contact` | List enquiries (supports `?status=` and `?search=` filters) |
| PATCH | `/api/contact/:id` | Update an enquiry's status |
| DELETE | `/api/contact/:id` | Delete an enquiry |

## SMTP Email Flow
```
Contact Form → POST /api/contact → Backend validates →
saves to MongoDB → Nodemailer → Brevo SMTP → Café's inbox
```
SMTP credentials are never exposed to the frontend — they live only in backend environment variables.

## Environment Variables
Set these in `backend/.env` (local) or your host's Environment Variables panel (production). See `.env.example` for the format — never commit real values.

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Backend port (default 5000) |
| `SMTP_HOST` | SMTP server address |
| `SMTP_PORT` | SMTP port |
| `SMTP_USER` | SMTP login |
| `SMTP_PASS` | SMTP password/key |
| `CONTACT_RECEIVER` | Inbox that receives contact enquiries |

## How to Run

**Frontend:** open `frontend/index.html` with VS Code's Live Server.

**Backend:**
```bash
cd backend
npm install
npm run dev
```
Runs at `http://localhost:5000`.

## Deployment
- **Frontend:** Netlify — https://blushcafe-swatismitaparida-fa740d.netlify.app
- **Backend:** Render — https://blush-cafe-website.onrender.com

## Security Notes
- `.env` is excluded from GitHub via `.gitignore` — only `.env.example` (placeholder values) is committed.
- SMTP credentials and MongoDB URI are stored as environment variables on Render, never in code or frontend.
- Backend validates all input independently of frontend validation, since frontend checks can be bypassed.

## Developer
**Swatismita Parida** — Full-Stack Developer Intern, SuuSri AI

© 2026 Blush Café, Bhubaneswar. All rights reserved.
