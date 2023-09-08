import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Header from "./components/Header";
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useState } from 'react';


function App() {

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);

  function onCreate(event) {
    event.preventDefault();
    const inputValue = event.target.elements[0].value

    const pattern = /^\s+/
    if(pattern.test(inputValue) || inputValue.length < 3) {
      alert("Type at least 3 characters. Only white spaces are not allowed");
      return
    }
    
    const task = {
      id: uuidv4(),
      task: inputValue,
      completed: false
    };
    
    if(tasks.length < 5) {
      setTasks([...tasks, task]);
      event.target.elements[0].value = '';
    } else {
      alert("You can oly add 5 tasks");
    }
  }

  function completeTask(id) {
    setTasks(tasks.map(task => {
      task.completed = task.id=== id ? !task.completed : task.completed;
      return task;
    }));
    
    setCompletedTasks(tasks.reduce((acc, crr) => acc + crr.completed, 0));
  }

  function deleteTask(id) {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    setCompletedTasks(filteredTasks.reduce((acc, crr) => acc + crr.completed, 0));
  }

  function updateTask(id, text) {
    setTasks(tasks.map(task => {
      if(task.id === id) {
        task.task = text
      }

      return task;
    }))
  }

  return (
    <div className='app'>
      <Header />
      <TaskForm submit={onCreate} />
      <TaskList onUpdateTask={updateTask} onDeleteTask={deleteTask} completedTasks={completedTasks} completeTask={completeTask} tasks={tasks}/>
    </div>
  );
}

export default App;
