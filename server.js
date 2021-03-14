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
mongoose.connect(process.env.DATABASE, {
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