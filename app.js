const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');

const session = require('express-session');


const app = express()

// Passport Config
require('./config/passport')(passport);

// DB config
const DB = require('./config/keys').MongoURI ;

//connect to DB
mongoose.connect(DB , {useNewUrlParser: true})
.then(()=> console.log("connected to mongodb ....."))
.catch(err => console.error("Could not connect")) 






app.use(express.static(path.join(__dirname , "assets")));

// بنستخدم لاي اوت دي عشان نعمل صفحة واحدة اسمها لاي اوت
// وتبقي فيها الهيدير والفوتر والحاجات الثابتة في كل صفحة 
// بتسهل علينا حوار اننا نعمل انكلود للهيدير والفوتر في كل صفحة
// ملحوظة لازم نحطها قبل ما نعمل سيت للفيو انجين
app.use(expressLayout);
app.set('view engine' , 'ejs');


//body parser
app.use(express.urlencoded({extended:false}))


app.use( session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))


app.use(flash())  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

app.use('/',require('./routes/index.route'));

app.use('/users',require('./routes/users.route'));


const port = process.env.PORT || 3000
app.listen(port,()=>{console.log(`Listening to port ${port}........`)})