const express = require('express');
const Students = require('../Controller/Student');
const router = express.Router();


router.get('/getstudents',Students.getAllStudents);
router.get('/:studentId',Students.getSpecificStudent);
router.post('/addstudent',Students.addStudent);
router.delete('/:studentId',Students.deleteStudent);
router.patch('/:studentId',Students.updateStudent);


module.exports = router;