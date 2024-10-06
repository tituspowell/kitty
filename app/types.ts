export interface Theme {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoContextType {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}
