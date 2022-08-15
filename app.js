const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');




const app = express()


app.use(express.static(path.join(__dirname , "assets")));

// بنستخدم لاي اوت دي عشان نعمل صفحة واحدة اسمها لاي اوت
// وتبقي فيها الهيدير والفوتر والحاجات الثابتة في كل صفحة 
// بتسهل علينا حوار اننا نعمل انكلود للهيدير والفوتر في كل صفحة
// ملحوظة لازم نحطها قبل ما نعمل سيت للفيو انجين
app.use(expressLayout);
app.set('view engine' , 'ejs');


app.use('/',require('./routes/index.route'));

app.use('/users',require('./routes/users.route'));


const port = process.env.PORT || 8000
app.listen(port,()=>{console.log(`Listening to port ${port}........`)})