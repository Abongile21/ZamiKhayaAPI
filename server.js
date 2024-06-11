const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.config');
const propertyRoutes= require('./routes/property.routes')
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');	

require('dotenv').config();

const app = express();



app.use(bodyParser.json());

// Routes
app.use('/zam', authRoutes);
app.use('/zam', userRoutes);
app.use('/zam', propertyRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
