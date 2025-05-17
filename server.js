const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

let todos = [];
let editingIndex = null;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { todos, editingIndex });
});

app.post('/add', (req, res) => {
  const todo = req.body.todo;
  if (todo) todos.push(todo);
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const index = parseInt(req.body.index);
  if (!isNaN(index)) todos.splice(index, 1);
  res.redirect('/');
});

app.post('/edit', (req, res) => {
  editingIndex = parseInt(req.body.index);
  res.redirect('/');
});

app.post('/update', (req, res) => {
  const updatedTodo = req.body.todo;
  if (editingIndex !== null && updatedTodo) {
    todos[editingIndex] = updatedTodo;
    editingIndex = null;
  }
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Todo app running at http://localhost:3000');
});
