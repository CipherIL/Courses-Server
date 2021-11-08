const express = require('express');

const {userLogin,userLogout} = require('../controllers/generalControllers');

const router = new express.Router();

router.post('/user/login', async (req,res)=>{
    const response = await userLogin(req.body);
    if(response.status===200){
        const data = {}
        data.isProfessor = response.isProfessor;
        if(!response.isProfessor && req.body.password === "aA12345") data.isFirstStudentLogin = true; 
        return res.cookie('token',response.payload).status(200).send({...data});
    }
    res.status(response.status).send(response.payload);
})


router.get('/user/logout', async (req,res)=>{
    const response = await userLogout(req.cookies);
    if(response.status === 200) res.clearCookie("token");
    res.status(response.status).send(response.payload);
})

module.exports = router;