const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db.config');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const propertyRoutes = require('./routes/property.routes');

require('dotenv').config();

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
    const db = await connectDB(uri);
    cachedDb = db;
    return db;
}

// Wrap Express app in serverless handler
module.exports = serverless(app);
