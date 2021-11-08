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
        day:{
            type: Number,
            required: true,
        },
        time:{
            type: String,
            required: true,
        }
    }],
    students:[{
        student:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        }
    }]
});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;