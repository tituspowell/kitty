import { theme } from '../styles/theme';

const StoryLoading = () => {
  return (
    <div
      className={`${theme.text.lowContrast} mx-auto flex justify-center items-center mt-4 md:mt-8`}
    >
      <h2 className='text-2xl mr-2 pb-2'>Generating</h2>
      <span className='loading loading-dots loading-md'></span>
    </div>
  );
};
export default StoryLoading;
