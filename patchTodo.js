const handleError = require('./handleError');
const handleSuccess = require('./handleSuccess');
const Todo = require('./model/todo');

const patchTodo = async ({ body, req, res }) => {
    try {
        const todo = JSON.parse(body); //AS POST
        const id = req.url.split('/').pop(); //AS DELETE{id}
        //更新單筆
        if(todo.title !== undefined ) {   
          //option開啟new 可回傳修改成功的資料、開啟runValidators 作更新資料的驗證
          const result = await Todo.findByIdAndUpdate(id,todo,{new: true, runValidators: true});
          if(result !== null){
            handleSuccess(res, result);
          }
          else{
            handleError(res, {'message' : '查無此ID'});
          } 

        }else{
          handleError(res, { "message": "欄位填寫錯誤"});
        }  
    
    } catch (error) {
      handleError(res, error);
    }
  };
  
  module.exports = patchTodo;



