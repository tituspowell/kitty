import Hero from './components/Hero';
import StoryContainer from './components/StoryContainer';

function storyPage() {
  return (
    <div className='max-w-[900px] mx-auto'>
      <Hero />
      <StoryContainer />
    </div>
  );
}
export default storyPage;
