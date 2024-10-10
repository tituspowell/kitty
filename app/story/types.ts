interface StoryRequest {
  object: string;
  setting: string;
}

interface StoryResponse {
  story: string;
}

interface StoryErrorResponse {
  error: string;
  details?: string;
}

interface HuggingFaceResponse {
  generated_text: string;
}
