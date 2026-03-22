import React, { useState, useEffect } from 'react';
import TaskGroup from './components/TaskGroup';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedData = localStorage.getItem('taskApp_data');
    
    if (!savedData) return [];

    const parsedTasks = JSON.parse(savedData);
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    const tugasYangMasihValid = parsedTasks.filter((task) => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      
      return taskDate.getTime() >= hariIni.getTime(); 
    });

    return tugasYangMasihValid;
  });

  useEffect(() => {
    localStorage.setItem('taskApp_data', JSON.stringify(tasks));
  },[tasks]);
  const [titleInput, setTitleInput] = useState('');
  const [dateInput, setDateInput] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    
    if (titleInput === '' || dateInput === '') {
      return; 
    }

    const newTask = {
      id: Date.now(), 
      title: titleInput,
      date: dateInput,
      isCompleted: false
    };

    setTasks([...tasks, newTask]);
    setTitleInput('');
    setDateInput('');
  };

  const handleToggle = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);

  //Buang task yang udah lewat deadline
  const validTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate >= hariIni; 
  });

  //Pisahin buat "Today" 
  const todayTasks = validTasks.filter((task) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === hariIni.getTime();
  });

  const otherTasks = validTasks.filter((task) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() > hariIni.getTime();
  });

  // Format tanggal hari ini buat header
  const todayFormatted = hariIni.toLocaleDateString('en-GB', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="app-container">
      <header>
        <h2>Good Morning, User 👋</h2>
        <p className="subtitle">It's {todayFormatted}</p>
      </header>

      <form onSubmit={handleCreate} className="form-container">
        <div className="input-box">
          <label>What do you want to do?</label>
          <input 
            type="text" 
            placeholder="Study for mid exams..." 
            value={titleInput} 
            onChange={(e) => setTitleInput(e.target.value)} 
          />
        </div>
        <div className="input-box">
          <label>When should it be done?</label>
          <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
        </div>
        <button type="submit" className="btn-create">Create</button>
      </form>

      <TaskGroup title="Today" tasks={todayTasks} onToggle={handleToggle} />
      <TaskGroup title="Other" tasks={otherTasks} onToggle={handleToggle} />
    </div>
  );
}

export default App;