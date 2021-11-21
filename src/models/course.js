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
        studentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        studentName:{
            type: String,
            required: true,
        },
    }],
    attendance:[{
        date:{
            type: Date,
            required: true,
            unique: false,
        },
        windows:[{
            time:{
                type: String,
                require: true,
            },
            attended:[{
                studentId:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student",
                    required: true,
                },
                studentName:{
                    type: String,
                    required: true,
                },
            }],
            notAttended:[{
                studentId:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student",
                    required: true,
                },
                studentName:{
                    type: String,
                    required: true,
                },
                reason:{
                    type: String,
                }
            }]
        }],   
    }]
});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;