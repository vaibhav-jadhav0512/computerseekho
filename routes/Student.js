const express = require('express');
const Student = require('../Controller/Student');
const router = express.Router();


// PARAMS
router.param('studentid', Student.StudentByID);

// ROUTES

// Create
router.post('/addstudent',Student.CreateStudent);
 
// Read 
router.get('/students', Student.GetAllStudents);
router.get('/student/:studentid', Student.getStudentById);

// Update
router.put('/updatestudent/:studentid', Student.UpdateStudentById);

// Delete
router.delete('/deletestudent/:studentid',Student.DeleteStudentById);


module.exports = router;
