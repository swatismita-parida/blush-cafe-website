# 🌸 Blush Café — Café Website

<<<<<<< HEAD
A modern, elegant, and responsive café website designed for a fictional café in **Saheed Nagar, Bhubaneswar, Odisha**.

Blush Café uses a soft **baby-pink, cream, and deep rose** color palette with floral accents, real food photography, smooth animations, interactive cards, a gallery lightbox, reviews slider, interactive map, and an online table reservation system.

---

## 🍰 Industry

**Restaurant / Café**

---

## 🎯 Project Objective

The objective of this project is to create a beautiful and user-friendly café website that provides visitors with information about the café, menu, special items, customer reviews, location, and table reservations.

The website focuses on:

* Modern UI/UX
* Responsive design
* Smooth animations
* Interactive elements
* Online reservation functionality
* Attractive food and café presentation

---

## 🛠️ Technologies Used

### Frontend

* **HTML5** — Website structure
* **CSS3** — Styling, Flexbox, Grid, gradients, responsive design, and animations
* **JavaScript** — Website interactivity
* **GSAP** — Advanced animations
* **ScrollTrigger** — Scroll-based animations
* **Leaflet.js** — Interactive map
* **Inline SVG** — Floral logo and decorative elements

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **CORS**
* **dotenv**

---

## 🌸 Website Sections

The website contains the following sections:

1. **Home / Hero**
2. **Café Favourites**
3. **About Us**
4. **Menu**
5. **Weekly Special**
6. **Gallery**
7. **Customer Reviews**
8. **Location**
9. **Table Reservation**
10. **Footer**

---

## ☕ Café Features

### Café Favourites

The website highlights popular café items such as:

* Pink Velvet Latte
* Butter Croissant
* Strawberry Cake
* Rose Cupcake
* Berry Iced Tea

### Menu

The menu is divided into:

* Coffee
* Bakes
* Something Cold

Each menu item includes its name, description, and price.

### Weekly Special

A dedicated section highlights the seasonal **Rose Pistachio Latte**.

---

## ✨ Interactive Features

### 1. Sticky Navigation

The navigation bar changes its appearance when the user scrolls down the page.

### 2. Responsive Mobile Menu

A hamburger menu is provided for mobile and smaller screen sizes.

### 3. Smooth Scrolling

Navigation links smoothly scroll to different sections of the website.

### 4. 3D Mouse Tilt Effect

Interactive cards respond to mouse movement with a subtle 3D tilt effect.

### 5. Scroll Animations

Sections and cards animate into view while scrolling using GSAP and ScrollTrigger.

### 6. Reviews Slider

Customer reviews are displayed through an automatic slider with clickable navigation dots.

### 7. Gallery Lightbox

Users can click gallery images to view them in an enlarged lightbox.

### 8. Table Reservation

Visitors can submit:

* Name
* Phone
* Email
* Date
* Time
* Number of guests

The reservation data is sent to the backend API and stored in MongoDB.

### 9. Reservation Validation

The backend checks whether the selected date and time slot has already been reserved.

### 10. Interactive Map

The Location section uses **Leaflet.js and OpenStreetMap** to display the café location in Bhubaneswar.

### 11. Back-to-Top Button

A floating button allows users to smoothly return to the top of the page.

### 12. Floating Reservation Sticker

A floating reservation button provides quick access to the table reservation section.

---

## 🎨 Design Features

The website follows a soft and elegant café aesthetic.

### Color Palette

* Baby Pink
* Soft Pink
* Cream
* Deep Rose
* Plum
* White

### UI Elements

* Rounded image cards
* Floral decorations
* Gradient backgrounds
* Interactive buttons
* 3D hover effects
* Floating decorative elements
* Image lightbox
* Responsive layouts
* Smooth transitions

---

## 🎬 Animations

The website includes multiple animations to create a premium user experience.

### GSAP Animations

* Hero entrance animation
* Scroll reveal animations
* Section fade-in effects
* Staggered card animations
* About section text reveal
* Gallery item animations
* Special section image animation

### CSS Animations

* Floating café decorations
* Rising coffee steam
* Hover transitions
* Card movement
* Button effects

---

## 🗺️ Location

**Blush Café**

7 Blush Lane,
Saheed Nagar,
Bhubaneswar, Odisha

**Opening Hours:**
Daily, 8:00 AM – 9:00 PM

---
=======
A modern and responsive café website created as part of the internship task.

## ✨ Implemented

* 🏠 Responsive home/hero section
* ☕ Café favourites and menu
* 🌸 About and weekly special sections
* 🖼️ Gallery with lightbox
* 💬 Customer reviews slider
* 📍 Interactive location map
* 📅 Table reservation form
* 📱 Responsive mobile navigation
* ✨ Smooth animations and 3D hover effects
* ⬆️ Back-to-top and floating reservation button

## 🛠️ Technologies

* 🌐 HTML5
* 🎨 CSS3
* ⚡ JavaScript
* ✨ GSAP & ScrollTrigger
* 🗺️ Leaflet.js
* 🟢 Node.js & Express.js
* 🍃 MongoDB & Mongoose

## 🔧 Backend

The backend handles:

* 📅 Table reservations
* 📩 Contact form submissions
* 🗄️ MongoDB data storage
* ✅ Reservation validation
>>>>>>> 42e4e5a47c4453498060c9aba1f5b9ec63ed5898

## 📂 Project Structure

```text
blush-cafe-website/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
<<<<<<< HEAD
│   │
│   ├── logo.png
│   ├── home1.png
│   ├── home2.png
│   ├── cafe1.png
│   ├── cafe 2.png
│   ├── Pink VElvet latte.png
│   ├── butter croissant.png
│   ├── Strawberry cake.png
│   ├── Rose cupcake.png
│   ├── berry iced tea.png
│   ├── americano.png
│   └── Ice-Rose.jpg
=======
│   └── assets/
>>>>>>> 42e4e5a47c4453498060c9aba1f5b9ec63ed5898
│
├── backend/
│   ├── server.js
│   ├── package.json
<<<<<<< HEAD
│   ├── package-lock.json
│   ├── .env
│   ├── .env.example
│   │
│   └── src/
│       └── models/
│           ├── Contact.js
│           └── Reservation.js
=======
│   └── src/
│       └── models/
>>>>>>> 42e4e5a47c4453498060c9aba1f5b9ec63ed5898
│
└── README.md
```

<<<<<<< HEAD
---

## ⚙️ Backend API

The backend is built using **Node.js, Express.js, and MongoDB**.

### Test API

```text
GET /api/test
```

### Reservation API

```text
POST /api/reservations
```

Creates a new table reservation.

```text
GET /api/reservations
```

Retrieves reservation records for administrative purposes.

### Contact API

```text
POST /api/contact
```

Stores a new contact message.

```text
GET /api/contact
```

Retrieves contact messages.

---

## 🚀 How to Run the Frontend

### Step 1

Open the `frontend` folder in VS Code.

### Step 2

Open `index.html`.

### Step 3

Run it using **Live Server**.

The website will open in your browser.

---

## 🖥️ How to Run the Backend

Make sure **Node.js** is installed.

Open a terminal inside the `backend` folder:

```bash
npm install
```

Create/configure the `.env` file with your MongoDB connection string.

Then start the server:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

The backend runs on:
=======
## 🚀 How to Run

### Frontend

Open the `frontend` folder in VS Code and run `index.html` using Live Server.

### Backend

```bash
cd backend
npm install
npm start
```

Backend runs on:
>>>>>>> 42e4e5a47c4453498060c9aba1f5b9ec63ed5898

```text
http://localhost:5000
```

<<<<<<< HEAD
---

## 🗄️ Database

The project uses **MongoDB** for storing:

* Table reservations
* Customer contact messages

Mongoose is used to define database models and handle database operations.

---

## 📱 Responsive Design

The website is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

CSS media queries are used to adapt the layout for different screen sizes.

---

## 🔐 Environment Variables

The backend uses environment variables through `dotenv`.

Example:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

**Do not share or commit your actual MongoDB credentials publicly.**

---

## 💡 Key Highlights

* 🌸 Elegant baby-pink café theme
* ☕ Modern café menu
* 📸 Real food and café images
* ✨ GSAP animations
* 🎨 3D hover effects
* 🖼️ Gallery lightbox
* 💬 Customer review slider
* 📍 Interactive OpenStreetMap
* 📅 Online table reservation
* 🗄️ MongoDB database integration
* 📱 Fully responsive design
* ⚡ Node.js + Express backend

---
=======
## 🌐 Live Website

https://blushcafe-swatismitaparida-fa740d.netlify.app
>>>>>>> 42e4e5a47c4453498060c9aba1f5b9ec63ed5898

## 👩‍💻 Developer

**Swatismita Parida**
<<<<<<< HEAD
Full-Stack Developer Intern
**SuuSri AI**

---

## 📄 License

This project is created for **educational, internship, and portfolio purposes**.

---

## ©️ Copyright

© 2026 **Blush Café, Bhubaneswar**. All rights reserved.

**Coffee, comfort & a little blush. 🌸☕**
=======
Full-Stack Developer Intern — SuuSri AI
>>>>>>> 42e4e5a47c4453498060c9aba1f5b9ec63ed5898
