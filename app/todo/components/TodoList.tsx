import { theme } from '@/app/styles/theme';
import SingleTask from './SingleTask';
import { useTodo } from '@/app/contexts/TodoContext';

const TodoList = () => {
  const { tasks, deleteAllCompleted } = useTodo();

  const anyCompleted: boolean =
    tasks.find((task) => task.completed) !== undefined;

  // Change the text if there are no tasks in the list
  const tasksExist: boolean = tasks.length > 0;
  const labelText = tasksExist ? 'TO DO:' : 'All done! Meeep!';

  return (
    <section className='p-4 mb-4'>
      <h2 className={`${theme.text.highContrast} text-2xl my-2`}>
        {labelText}
      </h2>
      {tasks.map((task) => {
        return <SingleTask key={task.id} task={task} />;
      })}
      <div className='flex mt-4'>
        {anyCompleted ? (
          <button
            className={`${theme.button.primary} px-4 pt-1 pb-2`}
            onClick={deleteAllCompleted}
          >
            Delete all completed
          </button>
        ) : (
          tasksExist && (
            <h4 className={`flex-1 flex rounded-l pl-2 text-gray-500`}>
              Click a task to mark as complete
            </h4>
          )
        )}
      </div>
    </section>
  );
};
export default TodoList;
