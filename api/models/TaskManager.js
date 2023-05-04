const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskManagerSchema = new Schema({
    text:{
        type: String,
        required: true
    }, 
    complete:{
        type: Boolean,
        default: false
    },
    timestamp:{
        type: String,
        default: Date.now()
    }
})

const TaskManager = mongoose.model("TaskMAnager", TaskManagerSchema)

module.exports = TaskManager