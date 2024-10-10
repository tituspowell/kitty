'use client';

import { useEffect, useState } from 'react';
import StoryInputForm from './StoryInputForm';
import StoryResults from './StoryResults';
import { StoryRequest } from '../types';

const defaultPrompt: StoryRequest = {
  object: 'turtle',
  setting: 'a beach',
};

const StoryContainer = () => {
  const [storyResult, setStoryResult] = useState<string>('');
  const [storyLoading, setStoryLoading] = useState(false);

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

      setStoryResult(data.story || 'Once upon a time...');
      console.log(data.story);
    } catch (error) {
      console.error('Error generating story:', error);
      setStoryResult(
        "Sorry, I couldn't create a story this time. Please try again!"
      );
    } finally {
      setStoryLoading(false);
    }
  };

  return (
    <section>
      {storyResult && !storyLoading && <StoryResults story={storyResult} />}
      <StoryInputForm
        isGenerating={storyLoading}
        generateStory={generateStory}
      />
    </section>
  );
};

export default StoryContainer;
