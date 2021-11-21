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
        const courseIds = req.student.courses.map(course=>course.courseId);
        const courses = await Course.find({
            '_id':{$in: courseIds}
        })
        res.status(200).send(courses);
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
}

const getStudentCourseAttendance = async (req,res) => {
    const courseId = req.params.courseId;
    const studentId = req.student._id.toString()
    console.log(studentId)
    try {
        const course = await Course.findById(courseId);
        console.log(course)
        const studentAttendance = course.attendance.filter(window=>{
            if(new Date(window.date) < Date.now()) return true;
            return false;
        })
        console.log(studentAttendance)
        studentAttendance.forEach(date=>{
            date.windows.forEach(window=>{
                window.attended = window.attended.filter(id => id.studentId.toString() === studentId)
            })
        })
        console.log(studentAttendance[0])
        res.send(studentAttendance)
    } catch(err) {
        console.log(err)
        res.status(500).send("Internal Server Error");
    }
}

const updateStudentCourseAttendance = async (req,res) => {
    const courseId = req.params.courseId;
    const studentId = req.student._id.toString();
    const studentName = req.student.name
    const dateId = req.body.date._id;
    const windows = req.body.windows;
    try {
        const course = await Course.findById(courseId);
        const dateIndex = course.attendance.findIndex(date => date._id.toString() === dateId)
        windows.forEach(updateWindow=>{
            const windowIndex = course.attendance[dateIndex].windows.findIndex(window=>window._id.toString() === updateWindow.windowId)
            if(updateWindow.attended) { //if Student attended
                //Updated attended array
                const studentIndex = course.attendance[dateIndex].windows[windowIndex].attended.findIndex(id=>id.studentId.toString()===studentId)
                if(studentIndex === -1) course.attendance[dateIndex].windows[windowIndex].attended.push({studentId,studentName});                    
                //remove from not attended array
                course.attendance[dateIndex].windows[windowIndex].notAttended = 
                course.attendance[dateIndex].windows[windowIndex].notAttended.filter(id=>id.studentId.toString()!==studentId);
            }
            else { //student didn't attend
                //remove from attended array
                course.attendance[dateIndex].windows[windowIndex].attended = 
                course.attendance[dateIndex].windows[windowIndex].attended.filter(id=>id.studentId.toString()!==studentId);
                //update notAttended array
                const studentIndex = course.attendance[dateIndex].windows[windowIndex].notAttended.findIndex(id=>id.studentId.toString()===studentId)
                if(studentIndex === -1) course.attendance[dateIndex].windows[windowIndex].notAttended.push({studentId,studentName,reason:updateWindow.reason});
                else course.attendance[dateIndex].windows[windowIndex].notAttended[studentIndex].reason = updateWindow.reason;
            }
        })
        await course.save();
        res.status(200).send("Attendance updated!");
    } catch(err) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getCourses,
    getStudentCourses,
    getStudentCourseAttendance,
    updateStudentCourseAttendance,
}