import Hero from './components/Hero';
import TasksContainer from './components/TasksContainer';

export default function Home() {
  return (
    <div className='max-w-[600px] mx-auto'>
      <Hero />
      <TasksContainer />
    </div>
  );
}
