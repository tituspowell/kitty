import { theme } from '@/app/styles/theme';

const StoryResults = ({ story }: { story: string }) => {
  return (
    <section
      className={`card ${theme.card} max-w-[600px] mx-auto shadow-xl justify-center align-top p-4 m-2`}
    >
      <h2 className='text-xl font-bold mb-2'>Kitty's Latest Adventure</h2>
      <p className=''>{story}</p>
    </section>
  );
};
export default StoryResults;
