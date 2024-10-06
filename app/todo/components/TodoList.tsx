import SingleTask from './SingleTask';
import { useTodo } from '@/app/contexts/TodoContext';

// A fair bit of prop drilling here, so a possible future improvement would be to use
// Context API for global state management
const TodoList = () => {
  const { tasks } = useTodo();
  console.log(tasks);

  // Change the text if there are no tasks in the list
  const labelText = tasks.length > 0 ? 'TO DO:' : 'All done! Meeep!';

  return (
    <section className='p-4 mb-4'>
      <h2 className='text-primary-50 text-2xl my-2'>{labelText}</h2>
      {tasks.map((task) => {
        return <SingleTask key={task.id} task={task} />;
      })}
    </section>
  );
};
export default TodoList;
