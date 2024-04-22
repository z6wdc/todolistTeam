const handleError = require('./handleError');
const handleSuccess = require('./handleSuccess');
const Todo = require('./model/todo');

const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    handleSuccess(res, todos);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = getTodo;
