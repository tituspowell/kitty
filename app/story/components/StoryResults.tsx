import { theme } from '@/app/styles/theme';

const StoryResults = ({ story }: { story: string }) => {
  return (
    <section className='max-w-[900px] mx-auto m-4'>
      <div
        className={`card ${theme.card} shadow-xl justify-center align-top p-4 m-4`}
      >
        <h2 className='text-xl font-bold mb-2'>Kitty's Little Adventure</h2>
        <p className=''>{story}</p>
      </div>
    </section>
  );
};
export default StoryResults;
