export interface StoryRequest {
  object: string;
  setting: string;
  preposition: string;
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
  generateStory: (storyInputs: StoryRequest) => void;
}

export type DropdownInputProps = {
  prepositionChanged: (prepositionSelected: string) => void;
};
