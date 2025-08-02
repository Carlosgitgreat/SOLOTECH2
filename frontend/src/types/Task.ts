export interface Task {
  id: number;
  title: string;
  status: 'pending' | 'completed';
}

export interface TaskFormData {
  title: string;
  status: 'pending' | 'completed';
}