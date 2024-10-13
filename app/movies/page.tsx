import Footer from '../components/Footer';
import { moviesAppExplanation } from '../explanationTexts';
import Hero from './components/Hero';
import MoviesContainer from './components/MoviesContainer';

export default function MoviesPage() {
  return (
    <div className='max-w-[900px] mx-auto flex-grow flex flex-col'>
      <Hero />
      <MoviesContainer />
      <Footer modalText={moviesAppExplanation} />{' '}
    </div>
  );
}
