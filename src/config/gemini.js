
const mockProcessCwd = () => '/';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Access the variable from Vite's env

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Initialize Google Generative AI client with the API key
const genAI = new GoogleGenerativeAI(apiKey);

// Define model and configuration
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

// Function to interact with the model
async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    // Correctly access the result text
    const responseText = result.response.text(); // Store response text
    console.log(responseText); // Log for debugging
    return responseText; // Return the correct variable
  } catch (error) {
    console.error('Error while interacting with the model:', error); // Handle errors
    throw error; // Optionally re-throw the error for higher-level handling
  }
}

export default run;
