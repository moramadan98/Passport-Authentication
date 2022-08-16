const express = require('express');
const router = express.Router();
const user = require('../models/User')

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.post('/signup', (req,res)=>{
    const { name , email , password ,password2 } = req.body

    let errors = []

    if(!name || !email || !password || !password2){
        errors.push({msg: "please enter all fields"});
    }

    if(password !== password2 ){
        errors.push({msg: "passwords do not match"});
    }

    if(password.length < 6){
        errors.push({msg: "password should be at least 6 characters"});
    }    

    if(errors.length > 0){
        res.render('signup',{
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        user.findOne({email : email})
    }
});


module.exports = router ;