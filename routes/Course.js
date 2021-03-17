const express = require('express');
const Course = require('../Controller/Course');
const router = express.Router();


// PARAMS
router.param('courseid', Course.CourseByID);

// ROUTES

// Create
router.post('/addcourse',Course.CreateCourse);
 
// Read 
router.get('/courses', Course.GetAllCourses);
router.get('/course/:courseid', Course.getCourseById);

// Update
router.put('/updatecourse/:courseid', Course.UpdateCourseById);

// Delete
router.delete('/deletecourse/:courseid',Course.DeleteCourseById);


module.exports = router;




