const express = require('express');

const professorAuth = require('../middleware/professorAuth');
const studentAuth = require('../middleware/studentAuth');
const { getCourses, getStudentCourses, getStudentCourseAttendance, updateStudentCourseAttendance } = require('../controllers/course.controllers');

const router = new express.Router();

//get all courses
router.get('/course/get-courses', professorAuth, getCourses);

//get all courses of student
router.get('/course/get-student-courses', studentAuth, getStudentCourses);

//get student attendance in course
router.get('/course/get-student-course-attendance/:courseId', studentAuth, getStudentCourseAttendance);

//update student attendance in course
router.patch('/course/edit-student-course-attendance/:courseId',studentAuth, updateStudentCourseAttendance);
module.exports = router;