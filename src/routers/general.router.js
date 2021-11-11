const express = require('express');
const {userLogin,userLogout, checkValidToken} = require('../controllers/general.controllers');

const router = new express.Router();

router.post('/user/login', userLogin);

router.get('/user/logout', userLogout);

router.get('/user/check-token', checkValidToken);

module.exports = router;