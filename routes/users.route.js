const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { forwardAuthenticated } = require('../config/auth');


router.get('/login',forwardAuthenticated,(req,res)=>{
    res.render('login')
})

router.get('/signup',forwardAuthenticated,(req,res)=>{
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
        User.findOne({email : email})
        .then(user => {
            if(user){
                errors.push({msg:'Email already exist'})
                res.render('signup',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            }
            else{
                const newUser = new User({name , email , password})
               // hash password
               bcrypt.genSalt(10 ,(err ,salt)=> 
                bcrypt.hash(newUser.password,salt,(err ,hash)=>{
                   if(err) {throw err};
                    //set password to hashed
                    newUser.password = hash;
                    //save user
                    newUser.save()
                    .then(user => {
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err))
               }))
            }
        });
    }
});



// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

// Logout
router.get('/logout', (req, res) => {
    req.logout( (err) =>{
        if(err){return next(err); }
        req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
    } );
    
  });

 



module.exports = router ;