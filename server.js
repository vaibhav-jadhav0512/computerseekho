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
const studentRoutes = require('./routes/StudentRoute');
const videoRoutes = require('./routes/VideoRoute');
const albumRoutes = require('./routes/AlbumRoute');
const staffRoutes = require('./routes/StaffRoute');
const imageRoutes = require('./routes/ImageRoute');
const courseRoutes = require('./routes/CourseRoute');




//Routes
app.use('/students',studentRoutes);
app.use('/video',videoRoutes);
app.use('/album',albumRoutes);
app.use('/staff',staffRoutes);
app.use('/image',imageRoutes);
app.use('/course',courseRoutes);


//Authorisation routes
const authRouter = require('./Controller/auth');
app.use('/api/Students',authRouter);


//Routes
app.get('/',(req,res)=>{
    res.send('We are on home');
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true ,useUnifiedTopology: true }, 
    ()=>{console.log('Connection Successful');
    });



//Port listener
app.listen(3000,() => {
    console.log('Server running');
});