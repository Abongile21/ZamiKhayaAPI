import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';

import propertyRoutes from '../routes/property.routes.js';
import authRoutes from '../routes/auth.routes.js';
import userRoutes from '../routes/user.routes.js';
import db from '../config/db.config.js';

config();

const app = express();

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/zam', authRoutes);
app.use('/zam', userRoutes);
app.use('/zam', propertyRoutes);

// Root route
app.get('/', (req, res) => res.send('Welcome to ZamiKhaya API'));

// MongoDB connection caching
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  if (!db.uri) throw new Error('❌ MONGO_URI not found');

  const connection = await mongoose.connect(db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = connection.connections[0].readyState;
  console.log('✅ Connected to MongoDB');
}

// Vercel API handler
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
