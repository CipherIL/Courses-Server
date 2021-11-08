const jwt = require('jsonwebtoken');
const Student = require('../models/student');

const studentAuth = async (req,res,next) => {
    try{
        if(!req.cookies.token) throw new Error();
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET);
        if(!decoded) throw new Error();
        const student = await Student.findById(decoded.data);
        if(!student) throw new Error();
        req.student = student;
        next();
    }catch(err){
        return res.status(401).send("Not Authorized")
    }
}

module.exports = studentAuth;