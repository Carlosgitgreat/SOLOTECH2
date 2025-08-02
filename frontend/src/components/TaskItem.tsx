import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, newStatus: 'pending' | 'completed') => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const handleStatusToggle = () => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    onStatusChange(task.id, newStatus);
  };

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={handleStatusToggle}
          className="task-checkbox"
        />
        <span className="task-title">{task.title}</span>
        <span className="task-status">
          {task.status === 'pending' ? 'Pendiente' : 'Completada'}
        </span>
      </div>
      <div className="task-actions">
        <button
          onClick={() => onEdit(task)}
          className="btn-edit"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn-delete"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskItem;