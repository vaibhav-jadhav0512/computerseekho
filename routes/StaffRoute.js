const express = require('express');
const Staff = require('../models/Staff');
const router = express.Router();


//Fetch Staff data
router.get('/',async(req,res)=>{
    try{
        const staff = await Staff.find();
        res.json(staff);
    }catch(err){
        res.json({message:err});
    }
});


//Fetch specific Staff
router.get('/:staffId',async (req, res)=>{
    try{
        const staff = await Staff.findById(req.params.staffId);
        res.json(staff);
    }catch(err){
        res.json({message:err});
    }
});


//Add Staff into database
router.post('/',async(req,res)=>{
     const staff = new Staff({
        _id : req.body._id,
        Email : req.body.Email,
        Name : req.body.Name,
        Mobile : req.body.Mobile,
        IsActive : req.body.IsActive,
        UserName : req.body.UserName,
        Password : req.body.Password,
        PhotoUrl : req.body.PhotoUrl,
        Datte : req.body.Datte
     });
     try{
     const savedStaff = await staff.save();
     res.json(savedStaff);
     }catch(err){
        res.json({message:err});
     }
});

//Delete Staff
router.delete('/:staffId',async (req, res)=>{
    try{
        const removedStaff = await Staff.remove({_id : req.params.staffId});
        res.json(removedStaff);
    }catch(err){
        res.json({message:err});
    }
});

//Update Staff
router.patch('/:staffId',async (req, res)=>{
    try{
        const updatedStaff = await Staff.updateOne(
            {_id : req.params.staffId},
            {$set: {Name : req.body.Name}});
        res.json(updatedStaff);
    }catch(err){
        res.json({message:err});
    }
});




module.exports = router;


