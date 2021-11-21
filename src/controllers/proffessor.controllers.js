const validator = require('validator');

const Professor = require('../models/professor');
const Student = require('../models/student');
const Course = require('../models/course');
const getAttendanceArray = require('../utils/getAttendanceArray');

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;

const addNewProfessor = async (req,res) => {
    //Data validation
    const data = req.body;
    if(!validator.isEmail(data.email)) return res.status(400).send("Invalid email");
    if(!passwordRegex.test(data.password)) return res.status(400).send("Invalid password");
    //Create DB Objects
    const professor = new Professor(data);
    
    //Save to DB and return
    try{
        await professor.save();
        res.status(201).send("professor created!")
    }catch(err){
        if(err.code === 11000) return res.status(400).send("Email already exists");
        res.status(500).send("Internal server error");
    }
}

const addNewStudent = async (req,res) => {
    const data = req.body
    //Data validation
    if(!validator.isEmail(data.email)) return res.status(400).send("Invalid email");
    try{
        //creating student object
        const student = new Student({...data,password:"aA12345"});
        //saving student to DB
        await student.save();
        return res.status(201).send("Student added!");
    }catch(err){
        if(err.code === 11000) return res.status(400).send("A student with this email already exists");
        res.status(500).send("Internal server error");
    }
}

const addNewCourse = async (req,res) => {
    const data = req.body
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    //data validation
    if(startDate>endDate) return res.status(400).send("Start date cannot be after end date");
    //find if not valid weekly windows
    if(endDate.getTime()-startDate.getTime() < 1000*60*60*24*7) { //if length of course is less than 6 days
        for(let i=0;i<data.weeklyWindows.length;i++){
            if(data.weeklyWindows[i].day < startDate.getDay() || data.weeklyWindows[i].day > endDate.getDay())
                return res.status(400).send("Weekly windows in days that are not in the course");
        }
    }
    //Insert course to DB
    try{
        const course = new Course(data);
        course.attendance = getAttendanceArray(startDate,endDate,data.weeklyWindows);
        await course.save();
        return res.status(200).send("Course created!");
    }catch(err){
        if(err.code === 11000) return res.status(400).send("Course already exists")
        res.status(500).send("Internal server error");
    }
}

const editStudentsInCourse = async (req,res) => {
    let course, courseStudents, ejectedStudents;
    try{
        //Get course
        course = await Course.findById(req.params.courseId);
        if(!course) return res.status(404).send("No such course");

        //Get students
        if(req.body.courseStudents?.length>0){
            courseStudents = await Student.find({
                '_id':{$in: req.body.courseStudents}
            });
        }
        if(req.body.ejectedStudents?.length>0){
            ejectedStudents = await Student.find({
                '_id':{$in: req.body.ejectedStudents}
            });
        }
        if(!courseStudents && !ejectedStudents) return res.status(400).send("No changes to commit");

        //update list of students in course
        if(!courseStudents) course.students = [];
        else course.students = courseStudents.map(student=>{return {studentId: student._id,studentName:student.name}});
        await course.save();

        //remove course from ejected students
        if(ejectedStudents){
            ejectedStudents.forEach(async (student) => {
                student.courses = student.courses.filter((courseId) => {courseId !== course._id});
                await student.save();
            })
        }
        
        //add course to course students
        if(courseStudents){
            courseStudents.forEach(async (student) => {
                if(!student.courses.find(el => el.courseId.valueOf() === course._id.valueOf())){
                    student.courses.push({courseId: course._id})
                    await student.save();
                }
            })
        }
        res.send("Updated Course!")

    }catch(err){
        res.status(500).send("Internal Server Error");
        console.log(err)
    }
}

const getAllStudents = async (req,res) => {
    try {
        const students = await Student.find({},{name:1});
        if(students.length === 0) return res.status(404).send("No students in database")
        res.status(200).send(students);
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    addNewProfessor,
    addNewStudent,
    addNewCourse,
    editStudentsInCourse,
    getAllStudents,
}