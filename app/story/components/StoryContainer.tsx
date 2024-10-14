// The main functionality for the story generator app.

'use client';

import { useState } from 'react';
import StoryInputForm from './StoryInputForm';
import StoryResults from './StoryResults';
import { StoryRequest } from '../types';
import StoryLoading from '@/app/components/StoryLoading';

const StoryContainer = () => {
  const [storyResult, setStoryResult] = useState<string>('');
  const [storyLoading, setStoryLoading] = useState(false);

  // The main generateStory function, triggered from the input form once the user enters
  // story parameters. It uses an API route to reach out to a LLM hosted by HuggingFace
  // to ask it to generate a story. Asychronously, naturally.
  const generateStory = async (storyInputs: StoryRequest) => {
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

      // We seem to have successfully got a story back
      setStoryResult(data.story);
    } catch (error) {
      // Something went wrong
      console.error('Error generating story:', error);
      setStoryResult(
        "Sorry, I couldn't create a story this time. Please try again!"
      );
    } finally {
      // Either way, we're not loading any more
      setStoryLoading(false);
    }
  };

  // Do we have a story to show?
  const storyToShow: boolean = !storyLoading && storyResult !== '';

  // Conditionally render the story results if we have them, and either a loading component
  // if we're in the process of generating one, or the input form if not
  return (
    <section className='flex-grow'>
      {storyToShow && <StoryResults story={storyResult} />}
      {storyLoading ? (
        <StoryLoading />
      ) : (
        <StoryInputForm generateStory={generateStory} />
      )}
    </section>
  );
};

export default StoryContainer;
