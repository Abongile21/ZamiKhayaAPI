const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.config');
const bookingRoutes = require('./routes/booking.routes');
const saleRoutes = require('./routes/sale.routes');
const rentalRoutes = require('./routes/rental.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');	

require('dotenv').config();

const app = express();
connectDB();


app.use(bodyParser.json());

// Routes
app.use('/zam', authRoutes);
app.use('/zam', userRoutes);
app.use('/zam', bookingRoutes);
app.use('/zam', saleRoutes);
app.use('/zam', rentalRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
