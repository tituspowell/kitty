import { TodoProvider } from '../contexts/TodoContext';

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TodoProvider>{children}</TodoProvider>;
}
