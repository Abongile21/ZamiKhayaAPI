require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const serverless = require('serverless-http');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const propertyRoutes = require('./routes/property.routes');
const connectDB = require('./config/db.config');

const app = express();

const allowedOrigins = [
    "https://zamikhaya.vercel.app",
    "http://localhost:4200"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g., curl, mobile apps, or same-file requests)
        if (!origin) return callback(null, true);

        // During development allow localhost and file:// origins for convenience
        if (process.env.NODE_ENV !== 'production') {
            if (origin.startsWith('file://') || /^http:\/\/localhost(:\d+)?$/.test(origin) || /^[A-Za-z]:\\\\/.test(origin)) {
                return callback(null, true);
            }
        }

        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.options("*", cors());

app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/zam', authRoutes);
app.use('/zam', userRoutes);
app.use('/zam', propertyRoutes);

app.get('/', (req, res) => res.send('Welcome to ZamiKhaya API'));

let cachedDb = null;

async function connectToDatabase(uri) {
    if (cachedDb) return cachedDb;
    cachedDb = await connectDB(uri);
    return cachedDb;
}

if (process.env.NODE_ENV !== 'production') {
    connectToDatabase(process.env.MONGO_URI)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.error('MongoDB Error:', err.message));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = serverless(app);
