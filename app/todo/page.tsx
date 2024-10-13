import Footer from '../components/Footer';
import { todoAppExplanation } from '../explanationTexts';
import Hero from './components/Hero';
import TasksContainer from './components/TasksContainer';

export default function Home() {
  return (
    <div className='max-w-[600px] mx-auto flex-grow flex flex-col'>
      <Hero />
      <TasksContainer />
      <Footer modalText={todoAppExplanation} />{' '}
    </div>
  );
}
