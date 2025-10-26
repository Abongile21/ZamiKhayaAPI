require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const propertyRoutes = require('./routes/property.routes');

const connectDB = require('./config/db.config'); // serverless-safe MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per file
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/zam', authRoutes);
app.use('/zam', userRoutes);
app.use('/zam', propertyRoutes);

// Test route
app.get('/', (req, res) => res.send('Welcome to ZamiKhaya API'));

// Connect to MongoDB (serverless-safe)
connectDB(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err.message));

module.exports = app;
