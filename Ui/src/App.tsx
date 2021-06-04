import { FC, useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import { ITask } from './interfaces'
import TodoTask from './components/TodoTask'
import Axios from 'axios'
const App: FC = ()  => {

  const [id, setId] = useState<string>(" ")
  const [taskName, setTaskName] = useState<string>(" ")
  const [description, setDescription] = useState<string>(" ")
  const [createdBy, setCreatedBy] = useState<string>(" ")
  const [createdOn, setCreatedOn] = useState<string>("")
  const [todo, setTodo] = useState<ITask[]>([])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((task) => {
      setTodo(task.data)
    })
  }, [])

  const addTask = () => {
    Axios.post("http://localhost:3001/api/insert", {
      id: id,
      taskName: taskName,
      description: description,
      createdBy: createdBy,
      createdOn: createdOn
    });

    setTodo([...todo, {
        id: id,
        taskName: taskName,
        description: description,
        createdBy: createdBy,
        createdOn: createdOn
      }])
  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodo(todo.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))
  }

 const updateTask = (newId: string) => {
    Axios.put("http://localhost:3001/api/update", {
        id: newId,
        taskName: taskName,
        description: description,
        createdBy: createdBy,
        createdOn: createdOn
    })      
  }


  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input type="text" placeholder="ID.." name="id" onChange={(event: ChangeEvent<HTMLInputElement>) => {
             setId((event.target.value))
          }}/>
          <input type="text" placeholder="taskName" name="taskName"  onChange={(event: ChangeEvent<HTMLInputElement>) => {
             setTaskName(event.target.value)
          }}/>
          <input type="text" placeholder="description" name="description"  onChange={(event: ChangeEvent<HTMLInputElement>) => {
             setDescription(event.target.value)
          }}/>
          <input type="text" placeholder="createdBy" name="createdBy"  onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCreatedBy(event.target.value)
          }}/>
          <input type="time" placeholder="createdOn" name="createdOn"  onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCreatedOn(event.target.value)
          }}/>
        </div>
        <button onClick={addTask}>Add-Task</button>
        <button onClick={()=>updateTask(id.valueOf())}>UPDATE</button>
      </div>
      <div className="todoList">{todo.map((task: ITask, key: number) => {
        return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  );
};

export default App;
