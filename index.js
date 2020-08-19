const express = require('express');
const path = require('path');

const db = require('./config/mongoose');
const Todo = require('./models/todo');

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
        duedate: 12-08-2020
    },
    {
        description: "vegetables",
        category: "personal",
        duedate: 16-08-2020
    }
]



app.get('/', (req,res) => {

    Todo.find({}, (err, todoList) => {
        if(err){
            console.log('Error in fetching items from db');
            return;
        }
        return res.render('home', {
            title: "TODO List",
            todo_list: todoList
        });
    });

   
});


app.post('/create-todolist' ,(req,res) => {
    Todo.create({
        description: req.body.description,
        category: req.body.category
    }, (err, newTodo) => {
        if(err){
            console.log('error in adding todo');
            return;
        }
        console.log('********',newTodo);
        return res.redirect('back');
    });
    
});

//for deleting todolist
app.get('/delete-todolist' , (req,res) => {
    //get the id query in the ul
    let id = req.query.id;
    //find the todo in db using id and delete
    Todo.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from db');
            return;
        }
        return res.redirect('back');
    });

    
   
});


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server:${err} `);
    }

    console.log(`server is running on port: ${port}`);
});