require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const serverless = require('serverless-http'); // Wrap for Vercel

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const propertyRoutes = require('./routes/property.routes');
const connectDB = require('./config/db.config');

const app = express();

// Middleware
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/zam', authRoutes);
app.use('/zam', userRoutes);
app.use('/zam', propertyRoutes);

// Test route
app.get('/', (req, res) => res.send('Welcome to ZamiKhaya API'));

// Serverless-safe MongoDB connection
let cachedDb = null;

async function connectToDatabase(uri) {
    if (cachedDb) return cachedDb;
    cachedDb = await connectDB(uri);
    return cachedDb;
}

// Use cached connection in routes (example)
// authRoutes, userRoutes, propertyRoutes should call `await connectToDatabase(process.env.MONGO_URI)` as needed

// === LOCAL SERVER ===
if (process.env.NODE_ENV !== 'production') {
    connectToDatabase(process.env.MONGO_URI)
        .then(() => console.log('✅ MongoDB Connected'))
        .catch(err => console.error('❌ MongoDB Error:', err.message));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// === VERCEL SERVERLESS EXPORT ===
module.exports = serverless(app);
