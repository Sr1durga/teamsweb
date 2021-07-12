const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("task", taskSchema);