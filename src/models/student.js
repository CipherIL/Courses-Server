const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const studentSchema = new mongoose.Schema({
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
    },
    courses:[{
        course:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        }
    }]
});

studentSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password,8);
    }
    next();
})

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;