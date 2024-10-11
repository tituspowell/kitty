import ExplainPleaseButton from '../components/ExplainPleaseButton';
import { storyAppExplanation } from '../explanationTexts';
import Hero from './components/Hero';
import StoryContainer from './components/StoryContainer';

function storyPage() {
  return (
    <div className='max-w-[900px] mx-auto'>
      <Hero />
      <StoryContainer />
      <ExplainPleaseButton text={storyAppExplanation} />
    </div>
  );
}
export default storyPage;
