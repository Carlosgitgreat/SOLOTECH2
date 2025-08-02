import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, newStatus: 'pending' | 'completed') => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  if (tasks.length === 0) {
    return <div className="no-tasks">No hay tareas disponibles. ¡Crea una nueva tarea!</div>;
  }

  return (
    <div className="task-list">
      <h2>Lista de Tareas</h2>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;