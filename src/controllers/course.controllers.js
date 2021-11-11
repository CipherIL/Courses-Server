const validator = require('validator');

const Professor = require('../models/professor');
const Student = require('../models/student');
const Course = require('../models/course');

const getCourses = async (req,res) => {
    try{
        const courses = await Course.find({});
        res.status(200).send(courses);
    }catch(err){
        res.status(500).send("Internal Server Error"); 
    }
}

const getStudentCourses = async (req,res) => {
    try{
        res.status(200).send(req.student.courses);
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getCourses,
    getStudentCourses
}