export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoContextType {
  isLoading: boolean;
  tasks: Task[];
  addTask: (text: string) => void;
  toggleCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, text: string) => void;
}
