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
const studentRoutes = require('./routes/Student');
const videoRoutes = require('./routes/Video');
const albumRoutes = require('./routes/Album');
const staffRoutes = require('./routes/Staff');
const imageRoutes = require('./routes/Image');
const courseRoutes = require('./routes/Course');

//Routes
app.use('/student',studentRoutes);
app.use('/video',videoRoutes);
app.use('/album',albumRoutes);
app.use('/staff',staffRoutes);
app.use('/image',imageRoutes);
app.use('/course',courseRoutes);


//Authorisation routes
const authRouter = require('./Controller/auth');
app.use('/api/Students',authRouter);


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED..!!");
}).catch(() => {
    console.log("DB NOT CONNECTED..!!");
})

// Port Configuration for server
const port = process.env.PORT || 3000;

//Port listener
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});