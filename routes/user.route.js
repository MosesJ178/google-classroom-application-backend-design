const express = require('express');
const {user} = require('../models/user.schema');
const router = express.Router();

router.post('/registerUser',async(req,res)=>{
    const {name,password} = req.body;
    try{
        const endUser = await user.create({name,password});
        return res.status(200).json(endUser);
    }
    catch(err){
        return res.status(400).json({err:err});
    }
})

module.exports = router;