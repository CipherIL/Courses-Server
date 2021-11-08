const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

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

professorSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password,8);
    }
    next();
})
const Professor = mongoose.model('Professor',professorSchema);

module.exports = Professor;