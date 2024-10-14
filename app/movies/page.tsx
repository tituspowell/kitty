// The main page for the movie search app. Next.js automatically provides the routing
// because this is called 'page.tsx' and is in a subfolder of the main app folder.
// Note that we have the Footer component here rather than one level up because the home
// page shouldn't have it so it isn't common to all pages like the Navbar is.

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
