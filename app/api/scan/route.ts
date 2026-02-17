import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy",
});

export async function POST(req: Request) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({
                result: "⚠️ OpenAI API key not configured.\n\nTo enable the medicine scanner:\n1. Get an API key from platform.openai.com\n2. Add OPENAI_API_KEY=sk-... to .env.local\n3. Restart the dev server",
            });
        }

        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            max_tokens: 1000,
            messages: [
                {
                    role: "system",
                    content: `You are MedAI Medicine Scanner, an expert pharmaceutical analysis system.

When shown an image of a medicine (pill, tablet, capsule, syrup bottle, packaging, or prescription label), analyze it and provide:

1. **Medicine Name** — identified name and brand
2. **Active Ingredients** — key compounds and their dosage
3. **Category** — e.g., Analgesic, Antibiotic, Antihypertensive
4. **Common Uses** — what it treats
5. **Dosage Info** — standard dosing from the packaging if visible
6. **Expiry / Batch** — if visible on packaging
7. **Warnings** — key contraindications or side effects
8. **Authenticity** — visual cues about legitimacy (packaging quality, hologram, etc.)

Format your response with clear markdown headers and bullet points.
If the image is NOT a medicine, politely say so and suggest uploading a medicine image.
Always end with: "⚠️ This is an AI analysis. Always verify with a licensed pharmacist."`,
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Analyze this medicine image. Identify the medicine, its ingredients, usage, and any safety information visible.",
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: image,
                                detail: "high",
                            },
                        },
                    ],
                },
            ],
        });

        const result = completion.choices[0]?.message?.content || "Unable to analyze the image.";

        return NextResponse.json({ result });
    } catch (error: any) {
        console.error("Scan API Error:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to analyze medicine image" },
            { status: 500 }
        );
    }
}
