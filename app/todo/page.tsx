import Hero from './components/Hero';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TasksContainer from './components/TasksContainer';

export default function Home() {
  return (
    <div className='max-w-[600px] mx-auto'>
      <ToastContainer />
      <Hero />
      <TasksContainer />
    </div>
  );
}
