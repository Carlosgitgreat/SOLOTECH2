import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task, TaskFormData } from './types/Task';
import { getAllTasks, createTask, updateTask, deleteTask } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  // Cargar tareas al iniciar
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTasks();
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Error al cargar las tareas. Por favor, intente nuevamente.');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData: TaskFormData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      setIsFormVisible(false);
    } catch (err) {
      setError('Error al crear la tarea. Por favor, intente nuevamente.');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (!editingTask) return;
    
    try {
      const updatedTask = await updateTask(editingTask.id, taskData);
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
      );
      setEditingTask(undefined);
      setIsFormVisible(false);
    } catch (err) {
      setError('Error al actualizar la tarea. Por favor, intente nuevamente.');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta tarea?')) {
      try {
        await deleteTask(id);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      } catch (err) {
        setError('Error al eliminar la tarea. Por favor, intente nuevamente.');
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleStatusChange = async (id: number, newStatus: 'pending' | 'completed') => {
    try {
      const updatedTask = await updateTask(id, { status: newStatus });
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (err) {
      setError('Error al actualizar el estado de la tarea. Por favor, intente nuevamente.');
      console.error('Error updating task status:', err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setEditingTask(undefined);
    setIsFormVisible(false);
  };

  const handleShowForm = () => {
    setEditingTask(undefined);
    setIsFormVisible(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestor de Tareas</h1>
      </header>
      
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        
        {isLoading ? (
          <div className="loading">Cargando tareas...</div>
        ) : (
          <>
            {!isFormVisible ? (
              <div className="task-container">
                <button className="btn-add" onClick={handleShowForm}>
                  Crear Nueva Tarea
                </button>
                <TaskList
                  tasks={tasks}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              </div>
            ) : (
              <TaskForm
                task={editingTask}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={handleCancelForm}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
