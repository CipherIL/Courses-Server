const express = require('express');
const Professor = require('../models/professor');
const {addNewProfessor,addNewStudent,addNewCourse} = require('../controllers/proffessorControllers');
const professorAuth = require('../middleware/professorAuth');
const router = new express.Router();


//Routers

///Dev only, creating new professors
router.post('/professor/add/new-professor', async (req,res)=>{
    const response = await addNewProfessor(req.body);
    res.status(response.status).send(response.payload);
})

router.post('/professor/add/new-student', professorAuth, async (req,res)=>{
    const response = await addNewStudent(req.body);
    res.status(response.status).send(response.payload);
})

router.post('/professor/add/new-course', async (req,res)=>{
    const response = await addNewCourse(req.body);
    res.status(response.status).send(response.payload);
})

module.exports = router;