const handleError = require("./handleError");
const handleSuccess = require("./handleSuccess");
const Todo = require("./model/todo");
const postTodo = async (res, body) => {
  try {
    let data = JSON.parse(body);
    let todo = await Todo.create(data);
    handleSuccess(res, todo);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = postTodo;
