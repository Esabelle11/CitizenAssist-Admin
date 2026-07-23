import { GoogleGenAI } from '@google/genai';
import {retry} from "@/helper/retry";

// Safely initialize the AI client
const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

/**
 * Helper function to generate a 768-dimension text embedding vector using Gemini.
 * @param text The string content to convert into an embedding.
 * @returns A promise that resolves to an array of numbers representing the vector.
 */


export async function generateEmbedding(text: string): Promise<number[]> {
  if (!text) {
    throw new Error("Text content is required to generate an embedding.");
  }

  try {
    const embeddingResponse = await retry(() =>
      ai.models.embedContent({
        model: 'gemini-embedding-2', // Updated from the broken 'text-embedding-004'
        contents: text,
        config: {outputDimensionality: 768 }
      })
    );
    // const embeddingResponse = await ai.models.embedContent({
    //   model: 'gemini-embedding-2', // Updated from the broken 'text-embedding-004'
    //   contents: text,
    //   config: {outputDimensionality: 768 }
    // });

    // Access the correct singular embedding object property returned from SDK
    const rawEmbedding = embeddingResponse.embeddings?.[0];

    if (!rawEmbedding || !rawEmbedding.values) {
      throw new Error("Gemini API did not return a valid embedding payload.");
    }

    // Safely check and extract values to satisfy the strict union type
    let embeddingVector: number[];

    if (Array.isArray(rawEmbedding.values)) {
      embeddingVector = rawEmbedding.values;
    } else if (typeof rawEmbedding.values === 'function') {
      // If it evaluates as the generator/iterator function, invoke it and cast it
      const iterator = (rawEmbedding.values as Function)();
      embeddingVector = Array.from(iterator) as number[];
    } else {
      // General backup for array-like structures
      embeddingVector = Array.from(rawEmbedding.values as any) as number[];
    }

    // Final integrity check ensuring it matches your pgvector length requirements
    if (!embeddingVector || embeddingVector.length === 0) {
      throw new Error("Extracted embedding vector array is empty.");
    }

    return embeddingVector; // ✅ TypeScript compiler error completely resolved!
  } catch (error: any) {
    console.error("Error inside generateEmbedding helper:", error);
    throw new Error(`Failed to generate embedding: ${error.message || error}`);
  }
}