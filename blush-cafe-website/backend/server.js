const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

const Reservation = require('../src/models/Reservation');

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:5500', 'https://wondrous-tartufo-155cbc.netlify.app', 'https://blushcafe-swatismitaparida-fa740d.netlify.app'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Email transporter (used to send a confirmation email after a reservation is saved)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.get('/api/test', (req, res) => {
    res.json({ message: '✅ Blush Cafe API is working!' });
});

// Create a new reservation
app.post('/api/reservations', async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();

        // Send confirmation email — failure to send email should not fail the reservation
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: reservation.email,
                subject: 'Your Blush Cafe Reservation is Confirmed',
                text: `Hi ${reservation.name},\n\nYour table for ${reservation.people} on ${new Date(reservation.date).toDateString()} at ${reservation.time} is booked.\n\nSee you soon at Blush Cafe!`
            }).catch((err) => console.error('⚠️ Email send failed:', err.message));
        }

        res.status(201).json({ message: '✅ Reservation created successfully', reservation });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ message: 'Validation failed', errors: messages });
        }
        console.error('❌ Reservation creation error:', err.message);
        res.status(500).json({ message: 'Something went wrong while creating the reservation' });
    }
});

// Get all reservations (useful for an admin view)
app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json(reservations);
    } catch (err) {
        console.error('❌ Fetch reservations error:', err.message);
        res.status(500).json({ message: 'Something went wrong while fetching reservations' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});
