import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const addTask = (description) => {
    const updatedTasks = [...tasks, { description: description, completed: false }];
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>LocalTasker</h1>
      <TaskInput onAddTask={addTask} />
      <TaskList tasks={tasks} onToggleTaskCompletion={toggleTaskCompletion} onDeleteTask={deleteTask} />
      <button className="clear-completed-btn" onClick={clearCompletedTasks}>Clear Completed</button>
    </div>
  );
};

const TaskInput = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      onAddTask(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter your task..."
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

const TaskList = ({ tasks, onToggleTaskCompletion, onDeleteTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li
          key={index}
          className={task.completed ? 'completed' : ''}
          onClick={() => onToggleTaskCompletion(index)}
        >
          {task.description}
          <button className="delete-btn" onClick={(event) => { event.stopPropagation(); onDeleteTask(index); }}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default App;
