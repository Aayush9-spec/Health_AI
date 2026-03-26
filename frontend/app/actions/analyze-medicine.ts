"use server";

import { getAiRuntime, parseJsonObject } from "@/lib/server-ai";

type MedicineAnalysis = {
    name: string;
    generic_name: string;
    purpose: string;
    dosage: string;
    warnings: string[];
    side_effects: string[];
    error?: string;
};

export async function analyzeMedicineImage(formData: FormData) {
    const file = formData.get("image") as File | null;

    if (!file) {
        return { error: "No image provided" };
    }

    try {
        const buffer = await file.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        const dataUrl = `data:${file.type};base64,${base64Image}`;

        const runtime = getAiRuntime("vision");

        if (!runtime) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return {
                error:
                    "Vision AI provider is not configured. Add OPENROUTER_API_KEY or OPENAI_API_KEY in environment variables.",
            };
        }

        const response = await runtime.client.chat.completions.create({
            model: runtime.model,
            max_tokens: 600,
            messages: [
                {
                    role: "system",
                    content: `You are an expert medical pharmacist AI.
Return strictly valid JSON with:
{
  "name": "medicine name",
  "generic_name": "active ingredient(s)",
  "purpose": "main therapeutic use",
  "dosage": "general dosage guidance",
  "warnings": ["warning 1", "warning 2"],
  "side_effects": ["side effect 1", "side effect 2"]
}
If image is not medicine, include an "error" field.`,
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyze this medicine image and return JSON." },
                        { type: "image_url", image_url: { url: dataUrl } },
                    ],
                },
            ],
        });

        const content = response.choices[0]?.message?.content || "";
        const parsed = parseJsonObject<MedicineAnalysis>(content);

        if (!parsed) {
            return { error: "Could not parse AI response. Please try another image." };
        }

        return { result: parsed, provider: runtime.provider };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to analyze image";
        console.error("AI Analysis Error:", message);
        return { error: message };
    }
}

