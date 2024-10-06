import { Task } from '../types';
import SingleTask from './SingleTask';

// A fair bit of prop drilling here, so a possible future improvement would be to use
// Context API for global state management
const TodoList = ({
  tasks,
  deleteTask,
  editTask,
  toggleCompleted,
}: {
  tasks: Task[];
  deleteTask: (id: string) => void;
  editTask: (id: string, newDescription: string) => void;
  toggleCompleted: (id: string) => void;
}) => {
  // Change the text if there are no tasks in the list
  const labelText = tasks.length > 0 ? 'TO DO:' : 'All done! Meeep!';

  return (
    <section className='p-4 mb-4'>
      <h2 className='text-primary-50 text-2xl my-2'>{labelText}</h2>
      {tasks.map((task) => {
        return (
          <SingleTask
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleCompleted={toggleCompleted}
          />
        );
      })}
    </section>
  );
};
export default TodoList;
