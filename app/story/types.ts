export interface StoryRequest {
  object: string;
  setting: string;
}

export interface StoryResponse {
  story: string;
}

export interface StoryErrorResponse {
  error: string;
  details?: string;
}

export interface HuggingFaceResponse {
  generated_text: string;
}

export interface StoryInputProps {
  isGenerating: boolean;
  generateStory: (storyInputs: StoryRequest) => void;
}
