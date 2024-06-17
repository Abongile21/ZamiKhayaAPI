const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.config');
const propertyRoutes= require('./routes/property.routes')
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');	
const mongoose =require('mongoose')
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(express.json())


app.use(cors())


// Routes
app.use('/zam', authRoutes);
app.use('/zam', userRoutes);
app.use('/zam', propertyRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(connectDB.uri).then(()=>{
        console.log("Connected successfully to DB!")
    }).catch((error)=>{
        console.log("Could not connect to DB due some error:", error),
        process.exit();
})
