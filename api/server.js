const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/mern-task-manager",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB")).catch(console.err)

const TaskManager = require('./models/TaskManager')

app.get('/taskManagers', async (req, res)=>{
    const taskManagers = await TaskManager.find()

    res.json(taskManagers)
})

app.post('/taskManager/new', (req,res) =>{
    const taskManager = new TaskManager({
        text: req.body.text
    })

    taskManager.save()

    res.json(taskManager)
})

app.delete('/taskManager/delete/:id', async (req,res) =>{
    const result = await TaskManager.findByIdAndDelete(req.params.id)

    res.json(result)
})

app.get('/taskManager/complete/:id', async (req,res) => {
    const taskManager = await TaskManager.findById(req.params.id)

    taskManager.complete = !taskManager.complete

    taskManager.save()

    res.json(taskManager)
})

app.listen(3001, () => console.log("Server started on Port 3001"))