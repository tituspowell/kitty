// API route arranged in the folder structure Next.js expects. Used by the story generator app to
// communicate with the Google API so that we can send prompts to a LLM.

import {
  StoryErrorResponse,
  StoryRequest,
  StoryResponse,
} from '@/app/story/types';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

    // Check for API key
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    if (!GOOGLE_API_KEY) {
      const errorResponse: StoryErrorResponse = {
        error: 'Server configuration error',
        details: 'API key is not configured',
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // Initialize the Google AI model
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Create the prompt
    const prompt = `Write a sweet, child-friendly story (about 100 words) about a kitten named Kitty and a ${object} ${preposition} ${setting}. Make it fun and engaging, suitable for young children. The story should have a clear beginning, middle, and end.`;

    // Generate the story
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let story = response.text();

    // Clean up the response
    story = cleanUpStoryResponse(story);

    const successResponse: StoryResponse = { story };
    return NextResponse.json(successResponse);
  } catch (error) {
    // Enhanced error logging
    console.error('Story generation error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      error,
    });

    const errorResponse: StoryErrorResponse = {
      error: 'Failed to generate story',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

const cleanUpStoryResponse = (story: string): string => {
  // Remove any quotation marks that might wrap the entire story
  story = story.replace(/^["']|["']$/g, '');

  // Remove any extra newlines and spaces
  story = story.replace(/\s+/g, ' ').trim();

  // Check if the story ends with punctuation
  if (!story.endsWith('.') && !story.endsWith('!') && !story.endsWith('?')) {
    story += '... And they lived happily ever after.';
  }

  return story;
};
