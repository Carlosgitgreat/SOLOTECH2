import React, { useState, useEffect } from 'react';
import { Task, TaskFormData } from '../types/Task';

interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: TaskFormData) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    status: 'pending',
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        status: task.status,
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('El título de la tarea es obligatorio');
      return;
    }
    
    onSubmit(formData);
    
    // Reset form if not editing
    if (!task) {
      setFormData({
        title: '',
        status: 'pending',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{task ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ingrese el título de la tarea"
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Estado:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pendiente</option>
          <option value="completed">Completada</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {task ? 'Actualizar' : 'Crear'}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;