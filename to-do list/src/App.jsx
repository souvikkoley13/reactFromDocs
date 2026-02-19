import { useState, useReducer } from 'react'
import './App.css'

function TaskControl({onDeleteTask, buttonLabel, taskId}){
  function handleClick(){
    onDeleteTask(taskId);
  }
  return(
    <>
      <button onClick={handleClick}> {buttonLabel} </button>
    </>
  )
}

function TaskLists({tasks, onDeleteTask}){
  return(
    <>
      {tasks.map(task=>(
         <li key={task.id}>{task.text} <TaskControl buttonLabel = "Delete" onDeleteTask = {onDeleteTask} taskId = {task.id}/> </li>
      ))}
    </>
  );
}


function ToDoUi() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text,setText] =  useState("");

  function handleDeleteTask(id) {
    const tempTasks = tasks.map(task => task.id !== id);
    setTasks(tempTasks);
  }

  function handleClick(){
    if(text != ""){
      setTasks([...tasks,{
        id: ++lastId,
        text: text,
        done: false
      }] )
      alert(text + " added to to-do list");
    } else {
      alert("please add a valid task");
    }
  }
  return (
    <>
      <input 
        placeholder='add task'
        value = {text}
        onChange={e=> setText(e.target.value)}
      />
      <button onClick={()=>{setText(""); handleClick();}}>add</button>
      <ul>
        <TaskLists tasks = {tasks} onDeleteTask = {handleDeleteTask}/>
      </ul>
    </>
  )
}

function App() {
  

  return (
    <>
      <ToDoUi />
    </>
  )
}
let lastId = 2;
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];


export default App
