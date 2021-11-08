const validator = require('validator');
const jwt = require('jsonwebtoken');

const Professor = require('../models/professor');
const Student = require('../models/student');
const Course = require('../models/course');
// const Token = require('../models/token');

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const addNewProfessor = async (data) => {
    //Data validation
    if(!validator.isEmail(data.email))
        return {
            status: 400,
            payload: "Invalid email"
        }
    if(!passwordRegex.test(data.password))
        return {
            status: 400,
            payload: "Invalid password"
        }

    //Create DB Objects
    const professor = new Professor(data);
    
    //Save to DB and return
    try{
        await professor.save();
        return {
            status: 201,
            payload: "professor created!"
        }
    }catch(err){
        if(err.code===11000) return {
                status: 400,
                payload: "Email already exists"
        }
        return{
            status: 500,
            payload: "Internal server error"
        }
    }
}

const addNewStudent = async (data) => {
    //Data validation
    if(!validator.isEmail(data.email)) return {
            status: 400,
            payload: "Invalid email"
    }
    try{
        //creating student object
        const student = new Student({...data,password:"aA12345"});
        //saving student to DB
        await student.save();
        return {
            status: 201,
            payload: "Student added!"
        }
    }catch(err){
        if(err.code === 11000) return {
            status: 400,
            payload: "A student with this email already exists"
        }
        return {
            status: 500,
            payload: "Internal server error"
        }
    }
}

const addNewCourse = async (data) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    //data validation
    if(startDate>endDate) return {
        status: 400,
        payload: "Start date cannot be after end date"
    }
    //find if not valid weekly windows
    if(endDate.getTime()-startDate.getTime() < 1000*60*60*24*7) { //if length of course is less than 6 days
        for(let i=0;i<data.weeklyWindows.length;i++){
            if(data.weeklyWindows[i].day < startDate.getDay() || data.weeklyWindows[i].day > endDate.getDay())
                return {
                    status: 400,
                    payload: "Weekly windows in days that are not in the course"
                }
        }
    }
    //Insert course to DB
    try{
        const course = new Course(data);
        await course.save();
        return {
            status: 200,
            payload: "Course created!"
        }
    }catch(err){
        console.log(err)
        if(err.code === 11000) return {
            status: 400,
            payload: "Course already exists"
        }
        return {
            status: 500,
            payload: "Internal server error"
        }
    }
}




module.exports = {
    addNewProfessor,
    addNewStudent,
    addNewCourse,
}