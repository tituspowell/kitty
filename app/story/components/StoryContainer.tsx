'use client';

import { useEffect, useState } from 'react';
import StoryInputForm from './StoryInputForm';
import StoryResults from './StoryResults';

const defaultPrompt: string =
  'Generate a cute short story about a kitten having an adventure';

const StoryContainer = () => {
  const [storyInputs, setStoryInputs] = useState({
    object: '',
    setting: '',
  });
  const [storyResult, setStoryResult] = useState<string>('');
  const [storyLoading, setStoryLoading] = useState(false);

  const generateStory = async () => {
    setStoryLoading(true);
    try {
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyInputs),
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setStoryResult(data.story || 'Once upon a time...');
    } catch (error) {
      console.error('Error generating story:', error);
      setStoryResult(
        "Sorry, I couldn't create a story this time. Please try again!"
      );
    } finally {
      setStoryLoading(false);
    }
  };

  // Fetch a new story from the Huggingface model API whenever we have a new story prompt
  // useEffect(() => {
  //   generateStory();
  // }, [prompt]);

  return (
    <section>
      <StoryInputForm />
      {/* <StoryResults story={story} /> */}
      <h1 className='text-3xl font-bold mb-6'>🐱 Kitten AI Playground 🐱</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Keep existing components */}

        {/* Story Generator */}
        <div className='border rounded-lg p-4 col-span-full'>
          <h2 className='text-2xl font-semibold mb-4'>
            Kitty's Adventure Generator
          </h2>
          <div className='flex flex-col md:flex-row gap-4 mb-4'>
            <div className='flex-1'>
              <label
                htmlFor='object'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Object
              </label>
              <input
                type='text'
                id='object'
                className='w-full px-3 py-2 border rounded-md'
                placeholder='e.g., magic wand, friendly turtle'
                value={storyInputs.object}
                onChange={(e) =>
                  setStoryInputs((prev) => ({
                    ...prev,
                    object: e.target.value,
                  }))
                }
              />
            </div>
            <div className='flex-1'>
              <label
                htmlFor='setting'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Setting
              </label>
              <input
                type='text'
                id='setting'
                className='w-full px-3 py-2 border rounded-md'
                placeholder='e.g., enchanted forest, outer space'
                value={storyInputs.setting}
                onChange={(e) =>
                  setStoryInputs((prev) => ({
                    ...prev,
                    setting: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <button
            onClick={generateStory}
            className='bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors'
            disabled={
              storyLoading || !storyInputs.object || !storyInputs.setting
            }
          >
            {storyLoading ? 'Creating Story...' : 'Generate Adventure!'}
          </button>

          {storyResult && (
            <div className='mt-6'>
              <h3 className='text-xl font-semibold mb-2'>
                Kitty's Adventure with {storyInputs.object} in{' '}
                {storyInputs.setting}
              </h3>
              <div className='bg-yellow-50 p-4 rounded-lg border border-yellow-100'>
                <p className='whitespace-pre-wrap'>{storyResult}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StoryContainer;
