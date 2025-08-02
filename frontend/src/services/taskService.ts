import axios from 'axios';
import { Task, TaskFormData } from '../types/Task';

// Usa la variable de entorno en producción o la URL local en desarrollo
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/tasks';

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTaskById = async (id: number): Promise<Task> => {
  try {
    const response = await axios.get<Task>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    throw error;
  }
};

export const createTask = async (taskData: TaskFormData): Promise<Task> => {
  try {
    const response = await axios.post<Task>(API_URL, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id: number, taskData: Partial<TaskFormData>): Promise<Task> => {
  try {
    const response = await axios.put<Task>(`${API_URL}/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw error;
  }
};