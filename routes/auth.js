const bcrypt = require('bcryptjs');
const Students = require('../models/Student');
const Staff = require('../models/Staff');
const {RegisterValidation,LoginValidation} = require('../Controller/validation');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const HttpStatus = require("http-status-codes");

  
router.post('/studentregister',async (req,res)=>{
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
router.post('/studentlogin',async (req,res)=>{
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


    //create and assign a token
    // const token= jwt.sign({_id: student._id}, process.env.TOKEN_SECRET);
    // res.header('auth-token',token).send(token); 

    // res.send('Logged in!');

    const token = jwt.sign({ data: student }, process.env.TOKEN_SECRET, {
        expiresIn: '5h'
    });

    res.cookie('auth-token', token);
    res.cookie('jwtoken', token, {
        expires: new Date(Date.now()+ 25892000000),
        httpOnly:true
    });
    res.profile = student;

    res
    .status(HttpStatus.OK)
        .json({ message: 'Login successful', student, token });
});


router.post('/staffregister',async (req,res)=>{
    //Validate data before we make a student
    const{error}=RegisterValidation(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);
    
    //check if the user is already in the database
    const userNameExist= await Staff.findOne({
        UserName : req.body.UserName
    });
    if(userNameExist)
    return res.status(400).send('UserName already exists');

    //check if the email is already in the database
    const emailExist= await Staff.findOne({
        Email : req.body.Email
    });
    if(emailExist)
    return res.status(400).send('Email already exists');



    //Hash the password
    const salt = await bcrypt.genSalt(10);     
    const hashedPassword = await bcrypt.hash(req.body.Password,salt);


    //Register new staff
    const staff = new Staff({
        Name : req.body.Name,
        Email : req.body.Email,
        UserName : req.body.UserName,
        Password : hashedPassword,
        PhotoUrl : req.body.PhotoUrl,
        Mobile : req.body.Mobile,
        Date : req.body.Date
    });
    try{
        const savedStaff = await staff.save();
        res.send({staff : staff._id});
    }catch(err){
        res.status(400).send(err);
    }
});
//Login
router.post('/stafflogin',async (req,res)=>{
    //Validate data before we make a student
    const{error}=LoginValidation(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    //check if the UserName exists in the database
    const staff= await Staff.findOne({
        UserName : req.body.UserName
    });
    if(!staff)
    return res.status(400).send('staff not found');

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.Password, staff.Password);
    if(!validPass)
    return res.status(400).send('invalid password');


    //create and assign a token
    // const token= jwt.sign({_id: staff._id}, process.env.TOKEN_SECRET);
    // res.header('auth-token',token).send(token); 

    // res.send('Logged in!');

    const token = jwt.sign({ data: staff }, process.env.TOKEN_SECRET, {
        expiresIn: '5h'
    });

    res.cookie('auth-token', token);
    res.cookie('jwtoken', token, {
        expires: new Date(Date.now()+ 25892000000),
        httpOnly:true
    });
    res.profile = student;

    res
    .status(HttpStatus.OK)
        .json({ message: 'Login successful', staff, token });
});

module.exports = router;