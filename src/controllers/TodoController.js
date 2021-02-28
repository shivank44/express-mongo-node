const Todo = require('../models/Todo');

function validTodo(todo) {
    const hasName = typeof todo.name == 'string' && todo.name.trim() != '';
    const hasDescription = typeof todo.description == 'string' && todo.description.trim() != '';
    return hasName && hasDescription;
}

exports.getAll = (req,res,next)=>{
    Todo.getAll().then(todos => {
        res.json(todos);
    });
  }

exports.getOne = (req,res,next)=>{
    Todo.getOne(req.params.id).then(todos => {
      if(todos) {
        res.json(todos);
      } else {
        next();
      }
  });
  } 
  
 exports.create = (req,res,next)=>{
    if(validTodo(req.body)) {
      Todo.create(req.body).then(todo => {
        res.json(todo[0]);
      });
    } else {
      next(new Error('Invalid todo'));
    }
  }
  
  exports.update = (req,res,next)=>{
    if(validTodo(req.body)) {
      Todo.update(req.params.id, req.body).then(todo => {
        res.json(todo[0]);
      });
    } else {
      next(new Error('Invalid Todo'));
    }
  }

  exports.delete = (req,res,next)=>{
    Todo.delete(req.params.id).then(() => {
      res.json({
        deleted: true
      });
    });
  }