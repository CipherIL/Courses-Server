const express = require('express');
const Student = require('../models/student');
const studentAuth = require('../middleware/studentAuth');
const {updateStudentPassword} = require('../controllers/student.controllers')
const router = new express.Router();

//edit student password
router.patch('/student/update-password',studentAuth,updateStudentPassword)

module.exports = router;