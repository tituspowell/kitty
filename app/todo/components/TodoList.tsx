import { theme } from '@/app/styles/theme';
import SingleTask from './SingleTask';
import { useTodo } from '@/app/contexts/TodoContext';

const TodoList = () => {
  const { tasks } = useTodo();

  // Change the text if there are no tasks in the list
  const labelText = tasks.length > 0 ? 'TO DO:' : 'All done! Meeep!';

  return (
    <section className='p-4 mb-4'>
      <h2 className={`${theme.text.highContrast} text-2xl my-2`}>
        {labelText}
      </h2>
      {tasks.map((task) => {
        return <SingleTask key={task.id} task={task} />;
      })}
    </section>
  );
};
export default TodoList;
