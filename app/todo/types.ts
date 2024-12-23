// Types specific to the To-Do List mini-app

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
  moveTaskUp: (id: string) => void;
  moveTaskDown: (id: string) => void;
  isFirstTask: (id: string) => boolean;
  isLastTask: (id: string) => boolean;
  deleteAllCompleted: () => void;
}
