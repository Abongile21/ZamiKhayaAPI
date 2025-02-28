require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
const propertyRoutes= require('./routes/property.routes')
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');	
const mongoose =require('mongoose')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const fileUpload= require('express-fileupload')



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload());


app.use(cors())



app.use('/zam', authRoutes);
app.use('/zam', userRoutes);
app.use('/zam', propertyRoutes);


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) =>{
  res.send(`Welcome to zamikhaya api`)
})

app.listen(PORT, (res, req) => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(connectDB.uri).then(()=>{
        console.log("Connected successfully to DB!")
    }).catch((error)=>{
        console.log("Could not connect to DB due some error:", error),
        process.exit();
})
