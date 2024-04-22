const handleError = require('./handleError');
const handleSuccess = require('./handleSuccess');
const Todo = require('./model/todo');

const patchTodo = async ({ body, req, res }) => {
    try {
        const todo = JSON.parse(body).title; //AS POST
        const id = req.url.split('/').pop(); //AS DELETE{id}
        const index = Todo.findIndex(element => element.id == id); //AS DELETE{id}
      
      if(todo !== undefined && index !== -1){

        const result = await Todo.findByIdAndUpdate(id,todo); //更新單筆
        handleSuccess(res, result);
 
        }else{
            handleError(res, error);
        }
    } catch (error) {
      handleError(res, error);
    }
  };
  
  module.exports = patchTodo;



