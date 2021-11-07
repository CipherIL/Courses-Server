const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date,
        required: true,
    },
    weeklyWindows:[{
        window:{
            type: String,
            required: true,
        }
    }],
    students:[{
        student:{
            type: String,
            required: true,
        }
    }]
});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;