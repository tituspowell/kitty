import Hero from './components/Hero';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MoviesContainer from './components/MoviesContainer';

export default function MoviesPage() {
  return (
    <div className='max-w-[900px] mx-auto'>
      <ToastContainer />
      <Hero />
      <MoviesContainer />
    </div>
  );
}
