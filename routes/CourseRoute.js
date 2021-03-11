const express = require('express');
const Course = require('../models/Course');
const router = express.Router();


//Fetch Course data
router.get('/',async(req,res)=>{
    try{
        const course = await Course.find();
        res.json(course);
    }catch(err){
        res.json({message:err});
    }
});


//Fetch specific Course
router.get('/:courseId',async (req, res)=>{
    try{
        const course = await Course.findById(req.params.courseId);
        res.json(course);
    }catch(err){
        res.json({message:err});
    }
});


//Add Course into database
router.post('/',async(req,res)=>{
     const course = new Course({
        _id : req.body._id,
        Name : req.body.Name,
        Description : req.body.Description,
        Duration : req.body.Duration,
        Fees : req.body.Fees,
        Syllabus : req.body.Syllabus,
        AgeGroupType : req.body.AgeGroupType,
        Datte : req.body.Datte,
        EnquiryCounter : req.body.EnquiryCounter,
        IsActive : req.body.IsActive,
        CoverPhoto : req.body.CoverPhoto,
        VideoId : req.body.VideoId
     });
     try{
     const savedCourse = await course.save();
     res.json(savedCourse);
     }catch(err){
        res.json({message:err});
     }
});

//Delete Course
router.delete('/:courseId',async (req, res)=>{
    try{
        const removedCourse = await Course.remove({_id : req.params.courseId});
        res.json(removedCourse);
    }catch(err){
        res.json({message:err});
    }
});

//Update Course
router.patch('/:courseId',async (req, res)=>{
    try{
        const updatedCourse = await Course.updateOne(
            {_id : req.params.courseId},
            {$set: {Name : req.body.Name}});
        res.json(updatedCourse);
    }catch(err){
        res.json({message:err});
    }
});




module.exports = router;


