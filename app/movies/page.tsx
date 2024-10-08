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
      <h4>
        More movie stuffs here and remember the attribution image for TMDB!
      </h4>
    </div>
  );
}
