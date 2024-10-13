import { theme } from '@/app/styles/theme';

const StoryResults = ({ story }: { story: string }) => {
  return (
    <section className='max-w-[900px] mx-auto m-4 mb-8 md:mb-12'>
      <div
        className={`card ${theme.card} ${theme.shadow} justify-center align-top p-4 m-4`}
      >
        <h2 className='text-2xl font-bold mb-4'>Kitty's Big Adventure</h2>
        <p className='text-lg'>{story}</p>
      </div>
    </section>
  );
};
export default StoryResults;
