const handleError = require('./handleError');
const handleSuccess = require('./handleSuccess');
const Todo = require('./model/todo');

const patchTodo = async ({ body, req, res }) => {
    try {
        const todo = JSON.parse(body); //AS POST
        const id = req.url.split('/').pop(); //AS DELETE{id}
        //更新單筆
        await Todo.findByIdAndUpdate(id,todo,{new: true,})
        .then((result)=>{
          //option開啟new 可回傳修改成功的資料
          handleSuccess(res, result);
        })
        .catch(error => {
          handleError(res, error);
        });         

    } catch (error) {
      handleError(res, error);
    }
  };
  
  module.exports = patchTodo;



