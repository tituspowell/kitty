import {
  HuggingFaceResponse,
  StoryErrorResponse,
  StoryRequest,
  StoryResponse,
} from '@/app/story/types';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Validate request body
    const { object, setting, preposition }: StoryRequest = await request.json();

    if (!object || !setting) {
      const errorResponse: StoryErrorResponse = {
        error: 'Missing parameters',
        details: 'Both object and setting are required',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const HF_API_TOKEN = process.env.HF_API_TOKEN;

    if (!HF_API_TOKEN) {
      const errorResponse: StoryErrorResponse = {
        error: 'Server configuration error',
        details: 'API token is not configured',
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    const prompt = `
<|system|>You are a children's story writer. Write a short, sweet story (about 100 words) about a kitten's adventure. Make it fun and engaging!</|system|>
<|user|>Write a story about a kitten named Kitty and a ${object} ${preposition} ${setting}.</|user|>
<|assistant|>`;

    console.log(prompt);

    const response = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            top_p: 0.95,
            return_full_text: false,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorResponse: StoryErrorResponse = {
        error: 'HuggingFace API error',
        details: `Status ${response.status}: ${response.statusText}`,
      };
      return NextResponse.json(errorResponse, { status: response.status });
    }

    const result = (await response.json()) as HuggingFaceResponse[];

    if (!result || !result[0]) {
      const errorResponse: StoryErrorResponse = {
        error: 'Invalid response from HuggingFace API',
        details: 'The API response was empty or in an unexpected format',
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    let story = result[0].generated_text;

    // Clean up the response
    story = cleanUpStoryResponse(story);

    const successResponse: StoryResponse = { story };
    return NextResponse.json(successResponse);
  } catch (error) {
    console.error('Story generation error:', error);

    const errorResponse: StoryErrorResponse = {
      error: 'Failed to generate story',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

const cleanUpStoryResponse = (story: string): string => {
  // Occasionally the generated story adds a user follow-up question or an assistant end tag; cut it off from there if so
  let unnecessaryBit = story.indexOf('<');
  if (unnecessaryBit !== -1) {
    story = story.slice(0, unnecessaryBit);
  }

  story = story
    // .replace(/^(Here's a story:|Once upon a time,)/i, 'Once upon a time,')
    // .replace(/["""]/g, '"')
    .trim();

  // Ensure the story ends with punctuation. Sometimes the generated story overruns and gets cut off,
  // so add a slightly neater ending than just stopping
  if (!story.endsWith('.') && !story.endsWith('!') && !story.endsWith('?')) {
    story += '... And they lived happily ever after.';
  }

  return story;
};
