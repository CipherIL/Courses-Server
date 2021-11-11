const express = require('express');

const professorAuth = require('../middleware/professorAuth');
const studentAuth = require('../middleware/studentAuth');
const { getCourses, getStudentCourses } = require('../controllers/course.controllers');

const router = new express.Router();

//get all courses
router.get('/course/get-courses', professorAuth, getCourses);

//get all courses of student
router.get('/course/get-student-courses', studentAuth, getStudentCourses);

module.exports = router;