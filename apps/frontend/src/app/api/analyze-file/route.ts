import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// 1. Initialize the Gemini Client
// The client automatically reads the GEMINI_API_KEY environment variable.
const ai = new GoogleGenAI({});

// The stable model optimized for fast performance on everyday text tasks.
const MODEL_NAME = "gemini-2.5-flash"; 

export async function POST(request: NextRequest) {
  try {
    // 2. Read the text prompt from the request body
    // The request body is expected to be: { prompt: "..." }
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'No text prompt provided in the request body.' }, 
        { status: 400 }
      );
    }
    
    // 3. Call the Gemini API for content generation (Text-only request)
    const response = await ai.models.generateContent({
      model: MODEL_NAME, 
      // The prompt is passed directly in the 'contents' array (or as a string)
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      
      // Optional: Configuration to control the response quality/randomness
      config: {
        temperature: 0.2, // Lower temperature for more deterministic/factual output
        maxOutputTokens: 112048,
      }
    });

    console.log(response);

    // 4. Extract the generated text
    const analysis = response.text;

    return NextResponse.json({ analysis });
    
  } catch (error) {
    console.error('Error analyzing content with Gemini API:', error);
    // Return a generic error response for security
    return NextResponse.json({ error: 'Failed to process text analysis' }, { status: 500 });
  }
}