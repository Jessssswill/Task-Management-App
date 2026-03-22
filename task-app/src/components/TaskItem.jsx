import React from 'react';

function TaskItem({ task, onToggle }) {
  const getLabelHari = (tanggalTask) => {
    const d = new Date(tanggalTask);
    d.setHours(0, 0, 0, 0);

    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    const besok = new Date(hariIni);
    besok.setDate(besok.getDate() + 1);

    if (d.getTime() === hariIni.getTime()) {
      return 'Today';
    } else if (d.getTime() === besok.getTime()) {
      return 'Tomorrow';
    } else {
      return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    }
  };

  const labelHari = getLabelHari(task.date);

  const getBadgeClass = (label) => {
    if (label === 'Today') return 'badge-today';
    if (label === 'Tomorrow') return 'badge-tomorrow';
    return 'badge-date';
  };

  return (
    <div className={`task-item ${task.isCompleted ? 'completed-bg' : ''}`}>
      <input type="checkbox" className="custom-checkbox" checked={task.isCompleted} onChange={() => onToggle(task.id)}/>
      
      <span className={`task-title ${task.isCompleted ? 'coret' : ''}`}>
        {task.title}
      </span>
      
      <span className={`task-label ${getBadgeClass(labelHari)}`}>
        {labelHari}
      </span>
    </div>
  );
}

export default TaskItem;