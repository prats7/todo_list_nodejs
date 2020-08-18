const express = require('express');
const path = require('path');

const db = require('./config/mongoose');
const app = express();
const port = 8000;

//set ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
 app.use(express.urlencoded());
app.use(express.static('assets'));



//use express router
app.use('/',require('./routes'));

var todoList = [
    {
        description: "vegetables",
        category: "personal",
    },
    {
        description: "vegetables",
        category: "personal",
    }
]



app.get('/', (req,res) => {
    return res.render('home', {
        title: "TODO List",
        todo_list: todoList
    });
});


app.post('/create-todolist' ,(req,res) => {
    todoList.push(req.body);
    return res.redirect('back');
});

//for deleting todolist
app.get('/delete-todo/:description' , (req,res) => {
    console.log(req.params);
    let description = req.params.description;

    let todoIndex = todoList.findIndex(todo => todo.description == description);
    if(todoIndex != -1){
        todoList.splice(todoIndex, 1);
    }
    return res.redirect('back');
});


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server:${err} `);
    }

    console.log(`server is running on port: ${port}`);
});