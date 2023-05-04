import { useState, useEffect } from 'react'

const api_base = "http://localhost:3001"

function App() {
  const[taskManagers, setTaskManagers] = useState([])
  const[popupActive, setPopupActive] = useState(false)
  const[newTaskManager, setNewTaskManager] = useState("")

  useEffect(() => {
    GetTaskManagers()

    console.log(taskManagers)
  }, [])

  const GetTaskManagers = () => {
    fetch(api_base + "/taskManagers")
      .then(res => res.json())
      .then(data => setTaskManagers(data))
      .catch(err => console.error("Error: ", err))
  }

  const completeTaskManage = async id => {
    const data = await fetch(api_base + "/taskManager/complete/" + id)
      .then(res => res.json())
    
    setTaskManagers(taskManagers => taskManagers.map(taskManager => {
      if(taskManager._id === data._id){
        taskManager.complete = data.complete
      }

      return taskManager
    }))
  }

  const deleteTaskManage = async id => {
    const data = await fetch(api_base + "/taskManager/delete/" + id, {
      method: "DELETE"
    }).then(res => res.json())

    setTaskManagers(taskManagers => taskManagers.filter(taskManager => taskManager._id !== data._id))
  }

  const addTaskManage = async () => {
    const data = await fetch(api_base + "/taskManager/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTaskManager
      })
    }).then(res => res.json())

    setTaskManagers([...taskManagers, data])
    setPopupActive(false)
    setNewTaskManager("")
  }


  return (
    <div className="App">
      <h1>Welcome, Bajradeepon</h1>
      <h4>Your Tasks</h4>

      <div className="tasks">
        {taskManagers.map(taskManager => (
          <div 
            className={"task " + (taskManager.complete ? "is-complete" : "")} 
            key={taskManager._id}
            onClick={() => completeTaskManage(taskManager._id)}
            >
            <div className="checkbox"></div>
            <div className="text">{taskManager.text}</div>
            <div className="delete-task" 
              onClick={() => deleteTaskManage(taskManager._id)}
              >x</div>
          </div>
        ))}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>x</div>
          <div className="content">
            <h3>Add Task</h3>
            <input type="text" className='add-task-input' 
              onChange={e => setNewTaskManager(e.target.value)}
              value={newTaskManager}
            />
            <div className="button" onClick={addTaskManage}>Create Task</div>
          </div>
        </div>
      ) : ''}

    </div>
  );
}


export default App;
