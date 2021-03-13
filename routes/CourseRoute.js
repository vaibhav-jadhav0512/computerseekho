const express = require('express');
const Course = require('../Controller/CourseController');
const router = express.Router();


router.get('/getcourses',Course.getAllCourses);
router.get('/:courseId',Course.getSpecificCourse);
router.post('/addcourse',Course.addCourse);
router.delete('/:courseId',Course.deleteCourse);
router.patch('/:courseId',Course.updateCourse);

module.exports = router;


