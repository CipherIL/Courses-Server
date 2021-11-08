const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const LoginCredentials = require('../models/loginCredentials');
const Professor = require('../models/professor');
const Student = require('../models/student');

const userLogin = async (loginData) => {
    //Find user by credentials
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
                token: jwt.sign({data:user.id},process.env.SECRET)
            });
            loginCredentials.save();
            return {
                status: 200,
                payload: loginCredentials.token,
                isProfessor,
            }
        }
        else return {
            status: 400,
            payload: "Invalid email or password"
        }
    }catch(err){
        return {
            status: 500,
            payload: "Internal server error"
        };
    }
}

const userLogout = async (cookies) => {
    let token = cookies.token;
    let loginCredentials;
    try{
        if(token) loginCredentials = await LoginCredentials.findOneAndRemove({token});
        if(loginCredentials) return {
            status: 200,
            payload: "Logged Out",
        }
        else return {
            status: 404,
            payload: "No such token",
        }
    }catch(err){
        return {
            status: 500,
            payload: "Internal server error",
        }
    }
}

module.exports = {
    userLogin,
    userLogout,
}