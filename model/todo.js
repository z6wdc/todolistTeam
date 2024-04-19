const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'title未填寫']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo
