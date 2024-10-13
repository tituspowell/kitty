import Hero from './components/Hero';
import MoviesContainer from './components/MoviesContainer';

export default function MoviesPage() {
  return (
    <div className='max-w-[900px] mx-auto'>
      <Hero />
      <MoviesContainer />
    </div>
  );
}
