const express = require('express');

const professorAuth = require('../middleware/professorAuth');
const {addNewProfessor,addNewStudent,addNewCourse,editStudentsInCourse,getAllStudents} = 
require('../controllers/proffessor.controllers');

const router = new express.Router();

//Routers

///Dev only, creating new professors
router.post('/professor/new-professor', addNewProfessor);

//Add new students to DB
router.post('/professor/new-student', professorAuth, addNewStudent);

//Add new courses to DB
router.post('/professor/new-course', professorAuth, addNewCourse);

//edit students in a course
router.post('/professor/edit-students/:courseId', professorAuth, editStudentsInCourse)

//Get all students in DB 
router.get('/professor/get-all-students',professorAuth,getAllStudents);

module.exports = router;