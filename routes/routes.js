const express = require('express');
const Students = require('../models/Students');
const router = express.Router();


//Fetch Students data
router.get('/',async(req,res)=>{
    try{
        const students = await Students.find();
        res.json(students);
    }catch(err){
        res.json({message:err});
    }
});


//Fetch specific student
router.get('/:studentId',async (req, res)=>{
    try{
        const student = await Students.findById(req.params.studentId);
        res.json(student);
    }catch(err){
        res.json({message:err});
    }
});


//Add student into database
router.post('/',async(req,res)=>{
     const students = new Students({
        _id : req.body._id,
        email : req.body.email,
        Name : req.body.Name,
        Address : req.body.Address,
        Gender : req.body.Gender,
        Photo : req.body.Photo,
        DOB : req.body.DOB,
        Age : req.body.Age,
        Qualification : req.body.Qualification,
        Mobile : req.body.Mobile,
        AlternateMobile : req.body.AlternateMobile,
        IsActive : req.body.IsActive,
        password : req.body.password
     });
     try{
     const savedStudent = await students.save();
     res.json(savedStudent);
     }catch(err){
        res.json({message:err});
     }
});

//Delete student
router.delete('/:studentId',async (req, res)=>{
    try{
        const removedStudent = await Students.remove({_id : req.params.studentId});
        res.json(removedStudent);
    }catch(err){
        res.json({message:err});
    }
});

//Update student
router.patch('/:studentId',async (req, res)=>{
    try{
        const updatedStudent = await Students.updateOne(
            {_id : req.params.studentId},
            {$set: {Name : req.body.Name}});
        res.json(updatedStudent);
    }catch(err){
        res.json({message:err});
    }
});




module.exports = router;


