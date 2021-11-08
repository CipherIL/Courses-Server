const jwt = require('jsonwebtoken');
const Professor = require('../models/professor');

const professorAuth = async (req,res,next) => {
    try{
        if(!req.cookies.token) throw new Error();
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET);
        if(!decoded) throw new Error();
        const professor = await Professor.findById(decoded.data);
        if(!professor) throw new Error();
        req.professor = professor;
        next();
    }catch(err){
        return res.status(401).send("Not Authorized")
    }
}

module.exports = professorAuth;