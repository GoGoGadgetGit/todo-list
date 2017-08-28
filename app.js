const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser')

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.engine('mustache', mustache());
server.set('views', './views')
server.set('view engine', 'mustache');



const todos = [
  { id: 0, text: "Wash the car" },
  { id: 1, text: "Walk the dog" },
  { id: 2, text: "Wash dishes" },
  { id: 3, text: "Wash dishes x2" },
];

const doneTodos = [

]

let nextId = 4

server.get("/", function (req, res) {
  res.render('home', { todos: todos,
  doneTodos: doneTodos });
});

server.post("/", function (req, res) {
  // TODO: instead of just adding text, add an object
  todos.push({id:nextId ++, text: req.body.todo});
  res.redirect('/');
});

server.post("/done/:id", function (req, res) {
  // TODO: can't delete based on index, we need to delete based on ID
  for (let i = 0; i < todos.length; i ++) {
    if (todos[i].id === parseInt(req.params.id)){
      doneTodos.push(todos[i]);
      todos.splice(i, 1);
    }
  }


  res.redirect('/');
});


server.listen(4000, function(){
  console.log('honey do');
})
