const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth.');

dotenv.config();

//Connect to the CDL Database
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true}, () => 
console.log('connected to the CDL Database'));

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);


app.listen(3000, () => console.log('Express is Up and Running'));

