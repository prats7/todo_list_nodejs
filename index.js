const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

//set ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

//use express router
app.use('/',require('./routes'));

app.get('/', (req,res) => {
    return res.render('home', {title: "TODO List"});
});

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server:${err} `);
    }

    console.log(`server is running on port: ${port}`);
});