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
