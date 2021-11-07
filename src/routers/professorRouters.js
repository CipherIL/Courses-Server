const express = require('express');
const Professor = require('../models/professor');
const {addNewProfessor} = require('../controllers/proffessorControllers')
const router = new express.Router();


//Routers
router.post('/professor/add/new-professor', async (req,res)=>{
    const professor = await addNewProfessor(req,res);
    res.send(professor);
})

module.exports = router;