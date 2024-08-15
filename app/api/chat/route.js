import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { prompt } = await req.json();

    if (!prompt) {
      console.log("No prompt provided");
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }

    console.log("Prompt received:", prompt);

    const result = await model.generateContent(prompt);
    console.log("Result from model:", result);

    const text = await result.response.text();

    return NextResponse.json({ message: text }, { status: 200 });
  } catch (error) {
    console.error("Error:", error); 
    return NextResponse.json({ error: error.message, details: error }, { status: 500 }); 
  }
}
