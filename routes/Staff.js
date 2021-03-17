const express = require('express');
const Staff = require('../Controller/Staff');
const router = express.Router();

// PARAMS
router.param('staffid', Staff.StaffByID);

// ROUTES

// Create
router.post('/addstaff',Staff.CreateStaff);
 
// Read 
router.get('/staffs', Staff.GetAllStaffs);
router.get('/staff/:staffid', Staff.getStaffById);

// Update
router.put('/updatestaff/:staffid', Staff.UpdateStaffById);

// Delete
router.delete('/deletestaff/:staffid',Staff.DeleteStaffById);


module.exports = router;

