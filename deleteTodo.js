const Todo = require("./model/todo");
const handleSuccess = require("./handleSuccess");
const handleError = require("./handleError");

async function deleteTodo(res, req = null) {
  if(!req){
    //刪除全部
  } 
  else{
    //刪除單一
    const id = req.url.split('/').pop();
    try{
        const result = await Todo.findByIdAndDelete(id);
        if(result !== null){
            handleSuccess(res, result);
        }
        else{
            handleError(res, {'message' : '查無此ID'});
        }
    }
    catch(error){
        handleError(res,error);
    }
  }
}

module.exports = deleteTodo;
