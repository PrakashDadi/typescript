import React from "react";
import { ITask } from '../interfaces';
import Axios from 'axios'


interface Props {
  task: ITask
  completeTask(taskNameToDelete: string): void
}

const deleteTodoList = (taskId:any)=>{
  Axios.delete(`http://localhost:3001/api/delete/${taskId}`)
}

const TodoTask = ({ task,completeTask}: Props) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.id}</span>
        <span>{task.taskName}</span>
        <span>{task.description}</span>
        <span>{task.createdBy}</span>
        <span>{task.createdOn}</span>
      </div>
      <button onClick={() => {
        completeTask(task.taskName)
        deleteTodoList(task.id)
      }}>X</button>
    </div>
  )
}

export default TodoTask;
