const bcrypt = require('bcryptjs');
const Students = require('../models/Student');
const {RegisterValidation,LoginValidation} = require('../Controller/validation');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

  
router.post('/register',async (req,res)=>{
    //Validate data before we make a student
    const{error}=RegisterValidation(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);
    
    //check if the user is already in the database
    const userNameExist= await Students.findOne({
        UserName : req.body.UserName
    });
    if(userNameExist)
    return res.status(400).send('UserName already exists');

    //check if the email is already in the database
    const emailExist= await Students.findOne({
        Email : req.body.Email
    });
    if(emailExist)
    return res.status(400).send('Email already exists');



    //Hash the password
    const salt = await bcrypt.genSalt(10);     
    const hashedPassword = await bcrypt.hash(req.body.Password,salt);


    //Register new student
    const student = new Students({
        Name : req.body.Name,
        Email : req.body.Email,
        UserName : req.body.UserName,
        Password : hashedPassword,
        Address : req.body.Address,
        Gender : req.body.Gender,
        PhotoUrl : req.body.PhotoUrl,
        DOB : req.body.DOB,
        Age : req.body.Age,
        Qualification : req.body.Qualification,
        Mobile : req.body.Mobile,
        AlternateMobile : req.body.AlternateMobile,
        IsActive : req.body.IsActive,
        Date : req.body.Date
    });
    try{
        const savedStudent = await student.save();
        res.send({student : student._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//Login
router.post('/login',async (req,res)=>{
    //Validate data before we make a student
    const{error}=LoginValidation(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    //check if the UserName exists in the database
    const student= await Students.findOne({
        UserName : req.body.UserName
    });
    if(!student)
    return res.status(400).send('UserName not found');

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.Password, student.Password);
    if(!validPass)
    return res.status(400).send('invalid password');


    // //create and assign a token
    // const token= jwt.sign({_id: student._id}, process.env.TOKEN_SECRET);
    // res.header('auth-token',token).send(token); 

    res.send('Logged in!');
});


module.exports = router;