// Iterates through the last of tasks (accessed via the Context API through the useTodo custom hook),
// and displays a SingleTask subcomponent for each one.

import { theme } from '@/app/styles/theme';
import SingleTask from './SingleTask';
import { useTodo } from '@/app/contexts/TodoContext';
import { motion, AnimatePresence } from 'framer-motion';

const TodoList = () => {
  const { tasks, deleteAllCompleted } = useTodo();

  // Note whether any of the tasks are marked as completed because we'll display
  // a 'delete all completed' button if so.
  const anyCompleted: boolean =
    tasks.find((task) => task.completed) !== undefined;

  // Change the text if there are no tasks in the list
  const tasksExist: boolean = tasks.length > 0;
  const labelText = tasksExist ? 'TO DO:' : 'All done! Meeep!';

  return (
    <section className='px-4 md:py-4'>
      {/* The label text */}
      <h2 className={`${theme.text.highContrast} text-2xl my-2`}>
        {labelText}
      </h2>
      {/* The list of tasks, wrapped in some animation functionality from the
        Framer Motion library. This has a nice smooth animation effect when
        moving a task up or down in the list, and also when adding or deleting */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300 }}
        className='border dark:border-none ${theme.border}'
      >
        <AnimatePresence>
          {tasks.map((task) => {
            return <SingleTask key={task.id} task={task} />;
          })}
        </AnimatePresence>
      </motion.div>
      {/* Conditionally render a 'delete all completed' button if appropriate,
        or a message encouraging them to click a task if not */}
      <div className='flex my-2'>
        {anyCompleted ? (
          <button
            className={`${theme.button.active} px-4 pt-1 pb-2`}
            onClick={deleteAllCompleted}
          >
            Delete all completed
          </button>
        ) : (
          tasksExist && (
            <h4
              className={`flex-1 flex rounded-l pl-2 md:pt-2 ${theme.text.lowContrast}`}
            >
              Click a task to mark as complete
            </h4>
          )
        )}
      </div>
    </section>
  );
};

export default TodoList;
