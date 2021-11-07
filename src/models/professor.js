const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    email:{
       type: String,
       required: true,
       unique: true, 
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    }  
});

const Professor = mongoose.model('Professor',professorSchema);

module.exports = Professor;