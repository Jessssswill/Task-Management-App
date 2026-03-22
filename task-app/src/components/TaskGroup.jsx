import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TaskGroup({ title, tasks, onToggle }) {
  const [isOpen, setIsOpen] = useState(true);

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="task-group">
      <div className="group-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="arrow-icon">
          {isOpen ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
          )}
        </span>
        
        <span className="calendar-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        </span>

        <h3>{title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>

      {isOpen && (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskGroup;