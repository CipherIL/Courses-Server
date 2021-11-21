const mongoose = require('mongoose');

const loginCredentialsSchema = new mongoose.Schema({
    isProfessor:{
        type: Boolean,
        required: true,
    },
    isFirstLogin:{
        type: Boolean,
        required: true,
    },
    token:{
        type: String,
        required: true,
    }
})

const LoginCredentials = mongoose.model('LoginCredentials',loginCredentialsSchema);

module.exports = LoginCredentials;