// The main page for the story generator app. Next.js automatically provides the routing
// because this is called 'page.tsx' and is in a subfolder of the main app folder.
// Note that we have the Footer component here rather than one level up because the home
// page shouldn't have it so it isn't common to all pages like the Navbar is.

import Footer from '../components/Footer';
import { storyAppExplanation } from '../explanationTexts';
import Hero from './components/Hero';
import StoryContainer from './components/StoryContainer';

function storyPage() {
  return (
    <div className='max-w-[900px] mx-auto flex-grow flex flex-col'>
      <Hero />
      <StoryContainer />
      <Footer modalText={storyAppExplanation} />{' '}
    </div>
  );
}
export default storyPage;
