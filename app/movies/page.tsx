import Hero from './components/Hero';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MoviesPage() {
  return (
    <div className='max-w-[600px] mx-auto'>
      <ToastContainer />
      <Hero />
      <h4>
        More movie stuffs here and remember the attribution image for TMDB!
      </h4>
    </div>
  );
}
