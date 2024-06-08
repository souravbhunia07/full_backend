const mongoose = require('mongoose');

const subTodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {timestamps: true});

export const SubTodo = mongoose.model('SubTodo', subTodoSchema);