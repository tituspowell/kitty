// API route arranged in the folder structure Next.js expects. Used by the story generator app to
// communicate with the Huggingface API so that we can send prompts to a LLM.

import {
  HuggingFaceResponse,
  StoryErrorResponse,
  StoryRequest,
  StoryResponse,
} from '@/app/story/types';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { object, setting, preposition }: StoryRequest = await request.json();

    // Validate request body
    if (!object || !setting) {
      const errorResponse: StoryErrorResponse = {
        error: 'Missing parameters',
        details: 'Both object and setting are required',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // The Huggingface API token is stored on the server and shouldn't ever reach the client.
    // Check we have one
    const HF_API_TOKEN = process.env.HF_API_TOKEN;
    if (!HF_API_TOKEN) {
      const errorResponse: StoryErrorResponse = {
        error: 'Server configuration error',
        details: 'API token is not configured',
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // Construct a prompt for the LLM. The LLMs available are not up to the standard we're used
    // to from ChatGPT and Claude, and aren't all that smart (but are free). Initial attempts at
    // sending a story request got a response where it merely extended the same request rather than
    // answering it. So now we set up a more structured prompt to coax it into a meaningful response.
    const prompt = `
      <|system|>You are a children's story writer. Write a short, sweet story (about 100 words) about a kitten's adventure. Make it fun and engaging!</|system|>
      <|user|>Write a story about a kitten named Kitty and a ${object} ${preposition} ${setting}.</|user|>
      <|assistant|>`;

    // Post it off to Huggingface and hope for the best
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

    // Check we got a response
    if (!response.ok) {
      const errorResponse: StoryErrorResponse = {
        error: 'HuggingFace API error',
        details: `Status ${response.status}: ${response.statusText}`,
      };
      return NextResponse.json(errorResponse, { status: response.status });
    }

    const result = (await response.json()) as HuggingFaceResponse[];

    // More validation
    if (!result || !result[0]) {
      const errorResponse: StoryErrorResponse = {
        error: 'Invalid response from HuggingFace API',
        details: 'The API response was empty or in an unexpected format',
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // So far so good. Extract the bit we want
    let story = result[0].generated_text;

    // Clean up the response
    story = cleanUpStoryResponse(story);

    const successResponse: StoryResponse = { story };
    return NextResponse.json(successResponse);
  } catch (error) {
    // Something went wrong
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
  const unnecessaryBit = story.indexOf('<');
  if (unnecessaryBit !== -1) {
    story = story.slice(0, unnecessaryBit).trim();
  }

  // Check if the story ends with punctuation. Sometimes the generated story overruns and gets cut off;
  // if so, add a slightly neater ending than just stopping
  if (!story.endsWith('.') && !story.endsWith('!') && !story.endsWith('?')) {
    story += '... And they lived happily ever after.';
  }

  return story;
};
