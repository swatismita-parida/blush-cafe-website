const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({
    origin: ['http://localhost:5500', 'https://wondrous-tartufo-155cbc.netlify.app', 'https://blushcafe-swatismitaparida-fa740d.netlify.app'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== MONGODB CONNECTION =====
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch((err) => console.error('❌ MongoDB Error:', err.message));

// ===== MODELS =====
const Reservation = require('./src/models/Reservation');
const Contact = require('./src/models/Contact');

// ===== TEST ROUTE =====
app.get('/api/test', (req, res) => {
    res.json({ message: '✅ Blush Cafe API is working!' });
});

// ===== RESERVATION ROUTES =====

// Create a new reservation
app.post('/api/reservations', async (req, res) => {
    try {
        const { name, email, phone, date, time, people, specialRequests } = req.body;

        // Check if slot is already booked
        const existing = await Reservation.findOne({
            date: new Date(date),
            time: time,
            status: { $ne: 'cancelled' }
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'This time slot is already booked. Please choose another time.'
            });
        }

        const reservation = new Reservation({
            name,
            email,
            phone,
            date,
            time,
            people,
            specialRequests
        });

        await reservation.save();

        res.status(201).json({
            success: true,
            message: '✅ Reservation created successfully!',
            data: {
                id: reservation._id,
                name: reservation.name,
                date: reservation.date,
                time: reservation.time,
                people: reservation.people
            }
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ success: false, message: 'Validation failed', errors: messages });
        }
        console.error('❌ Reservation error:', err.message);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
});

// Get all reservations (Admin)
app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json({ success: true, count: reservations.length, data: reservations });
    } catch (err) {
        console.error('❌ Fetch error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to fetch reservations' });
    }
});

// ===== CONTACT ROUTES =====

// Create a contact message
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = new Contact({
            name,
            email,
            subject: subject || 'General Inquiry',
            message
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: '✅ Message sent successfully! We will get back to you soon.'
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ success: false, message: 'Validation failed', errors: messages });
        }
        console.error('❌ Contact error:', err.message);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
});

// Get all contact messages (Admin)
app.get('/api/contact', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, count: messages.length, data: messages });
    } catch (err) {
        console.error('❌ Fetch error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to fetch messages' });
    }
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});
