const express = require('express');
const path = require('path');
const mongoose = require('mongoose');




const app = express()


app.use(express.static(path.join(__dirname , "assets")));

app.set('view engine' , 'ejs');






const port = process.env.PORT || 8000
app.listen(port,()=>{console.log(`Listening to port ${port}........`)})