const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const LoginCredentials = require('../models/loginCredentials');
const Professor = require('../models/professor');
const Student = require('../models/student');

const userLogin = async (req,res) => {
    //Find user by credentials
    const loginData = req.body;
    const isFirstLogin = loginData.password === 'aA12345' ? true : false;
    let isProfessor,user;
    try{
        user = await Professor.findOne({'email':loginData.email});
        if(user) isProfessor = true;
        else {
            user = await Student.findOne({'email':loginData.email});
            isProfessor = false;
        }     
        if(user && await bcryptjs.compare(loginData.password,user.password)){ //login successful
            const loginCredentials = new LoginCredentials({
                isProfessor,
                isFirstLogin,
                token: jwt.sign({data:user.id},process.env.SECRET)
            });
            loginCredentials.save();
            res.cookie('token',loginCredentials.token)
            return res.status(200).send({
                isProfessor,
                isFirstLogin,
            });
        }
        else return res.status(400).send("Invalid email or password")
    }catch(err){
        return res.status(500).send("Internal server error")
    }
}

const userLogout = async (req,res) => {
    let token = req.cookies.token;
    let loginCredentials;
    try{
        if(token) loginCredentials = await LoginCredentials.findOneAndRemove({token});
        if(loginCredentials) {
            res.clearCookie('token');
            return res.status(200).send("Logged Out");
        }
        else {
            res.clearCookie('token');
            return res.status(404).send("No such token");
        }
    }catch(err){
        return res.status(500).send("Internal Server Error");
    }
}

const checkValidToken = async(req,res) => {
    try{
        const token = req.cookies.token;
        const loginCredentials = await LoginCredentials.findOne({token});
        if(loginCredentials) return res.status(200).send({
            isProfessor: loginCredentials.isProfessor,
            isFirstLogin: loginCredentials.isFirstLogin,
        });
        else {
            res.clearCookie('token');
            return res.status(404).send("No such token");
        }
    }catch(err){
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    userLogin,
    userLogout,
    checkValidToken,
}