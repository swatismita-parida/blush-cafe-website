const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({
    origin: [
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'https://wondrous-tartufo-155cbc.netlify.app',
        'https://blushcafe-swatismitaparida-fa740d.netlify.app'
    ],
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

// ===== SMTP TRANSPORTER =====
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

transporter.verify()
    .then(() => console.log('✅ SMTP connection successful'))
    .catch((error) => console.error('❌ SMTP connection failed:', error.message));

// ===== TEST ROUTE =====
app.get('/api/test', (req, res) => {
    res.json({ message: '✅ Blush Cafe API is working!' });
});

// =====================================================
// CONTACT — validation, SMTP email, MongoDB save
// =====================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactInput(body) {
    const errors = [];
    const { name, email, phone, subject, message } = body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
        errors.push('Name is required.');
    } else if (name.trim().length < 2 || name.trim().length > 80) {
        errors.push('Name must be between 2 and 80 characters.');
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
        errors.push('Email is required.');
    } else if (!EMAIL_REGEX.test(email.trim())) {
        errors.push('Please provide a valid email address.');
    }

    if (phone && (typeof phone !== 'string' || phone.trim().length > 20)) {
        errors.push('Phone number looks invalid.');
    }

    if (subject && (typeof subject !== 'string' || subject.trim().length > 120)) {
        errors.push('Subject cannot exceed 120 characters.');
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
        errors.push('Message is required.');
    } else if (message.trim().length < 10 || message.trim().length > 1000) {
        errors.push('Message must be between 10 and 1000 characters.');
    }

    return errors;
}

// Create a new contact enquiry — validates, saves to MongoDB, sends an SMTP email
app.post('/api/contact', async (req, res) => {
    try {
        const errors = validateContactInput(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ success: false, message: 'Validation failed', errors });
        }

        const { name, email, phone, subject, message } = req.body;

        const contact = new Contact({
            name: name.trim(),
            email: email.trim(),
            phone: phone ? phone.trim() : undefined,
            subject: subject ? subject.trim() : 'General Inquiry',
            message: message.trim()
        });
        await contact.save();

        try {
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: process.env.CONTACT_RECEIVER,
                replyTo: contact.email,
                subject: `New Contact Form Enquiry — ${contact.subject}`,
                text: `Name: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone || 'Not provided'}\n\nMessage:\n${contact.message}`
            });
        } catch (mailErr) {
            console.error('⚠️ SMTP send failed:', mailErr.message);
        }

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully. We will get back to you soon.',
            data: { id: contact._id }
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ success: false, message: 'Validation failed', errors: messages });
        }
        console.error('❌ Contact error:', err.message);
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
    }
});

// ===== ADMIN: list enquiries (supports search + status filter) =====
app.get('/api/contact', async (req, res) => {
    try {
        const { status, search } = req.query;
        const filter = {};
        if (status && ['new', 'in-progress', 'resolved'].includes(status)) {
            filter.status = status;
        }
        if (search) {
            const regex = new RegExp(search, 'i');
            filter.$or = [{ name: regex }, { email: regex }, { message: regex }];
        }
        const messages = await Contact.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: messages.length, data: messages });
    } catch (err) {
        console.error('❌ Fetch error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to fetch messages' });
    }
});

// ===== ADMIN: view a single enquiry =====
app.get('/api/contact/:id', async (req, res) => {
    try {
        const entry = await Contact.findById(req.params.id);
        if (!entry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
        res.json({ success: true, data: entry });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid enquiry id' });
    }
});

// ===== ADMIN: update enquiry status =====
app.patch('/api/contact/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['new', 'in-progress', 'resolved'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value' });
        }
        const entry = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!entry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
        res.json({ success: true, message: 'Status updated', data: entry });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid enquiry id' });
    }
});

// ===== ADMIN: delete an enquiry =====
app.delete('/api/contact/:id', async (req, res) => {
    try {
        const entry = await Contact.findByIdAndDelete(req.params.id);
        if (!entry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
        res.json({ success: true, message: 'Enquiry deleted' });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid enquiry id' });
    }
});

// =====================================================
// RESERVATIONS
// =====================================================

app.post('/api/reservations', async (req, res) => {
    try {
        const { name, email, phone, date, time, people, specialRequests } = req.body;

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

        const reservation = new Reservation({ name, email, phone, date, time, people, specialRequests });
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

app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json({ success: true, count: reservations.length, data: reservations });
    } catch (err) {
        console.error('❌ Fetch error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to fetch reservations' });
    }
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});