// The main page for the task list app. Next.js automatically provides the routing
// because this is called 'page.tsx' and is in a subfolder of the main app folder.
// Note that we have the Footer component here rather than one level up because the home
// page shouldn't have it so it isn't common to all pages like the Navbar is.

import Footer from '../components/Footer';
import { TodoProvider } from '../contexts/TodoContext';
import { todoAppExplanation } from '../explanationTexts';
import Hero from './components/Hero';
import TasksContainer from './components/TasksContainer';

export default function Home() {
  return (
    <TodoProvider>
      <div className='max-w-[600px] mx-auto flex-grow flex flex-col'>
        <Hero />
        <TasksContainer />
        <Footer modalText={todoAppExplanation} />{' '}
      </div>
    </TodoProvider>
  );
}
