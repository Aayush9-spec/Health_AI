import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy", // Fallback to avoid build errors, check in logic
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                {
                    role: "ai",
                    content: "⚠️ System Alert: medical-intelligence-node-missing.\n\nTo activate the Real AI Brain:\n1. Get an API Key from platform.openai.com\n2. Create a .env.local file\n3. Add OPENAI_API_KEY=sk-...\n\n(Falling back to local simulation mode...)"
                },
                { status: 200 } // Return 200 to handle gracefully on frontend
            );
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are MedAI, an advanced decentralized medical intelligence assistant. 
          Your goal is to analyze symptoms, suggest potential diagnoses (with disclaimers), and recommend actions.
          
          Tone: Professional, Empathetic, Concise, and medically grounded.
          
          Capabilities:
          1. Analyze symptoms provided by the user.
          2. Suggest specialists (e.g., Neurologist, Cardiologist).
          3. Detect urgency (e.g., "Go to ER" for chest pain).
          4. If the user asks to book, output a structured JSON action hidden in the text or just confirm.
          
          Format your response with clear markdown.
          IMPORTANT: Always end with a disclaimer: "I am an AI, not a doctor. Please consult a professional."
          `
                },
                ...messages
            ],
        });

        const aiMessage = completion.choices[0].message;

        return NextResponse.json(aiMessage);

    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
