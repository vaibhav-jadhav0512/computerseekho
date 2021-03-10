const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');


//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import routes
const studentRoutes = require('./routes/routes');

//Students routes
app.use('/students',studentRoutes);

//Authorisation routes
const authRouter = require('./routes/auth');
app.use('/api/Students',authRouter);


//Routes
app.get('/',(req,res)=>{
    res.send('We are on home');
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true },
    ()=>{console.log('Connection Successful');
    });



//Port listener
app.listen(3000,() => {
    console.log('Server running');
});