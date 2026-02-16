import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export interface ExtractionResult {
  hospital_name: string;
  date_of_service: string;
  account_number: string;
  patient_name: string;
  bill_type: "er" | "hospital" | "urgent_care" | "other";
  state: string;
  insurance_status: "insured" | "uninsured" | "underinsured";
  total_charges: number;
  line_items: Array<{
    description: string;
    cpt_code: string | null;
    revenue_code: string | null;
    quantity: number;
    unit_charge: number;
    total_charge: number;
  }>;
  raw_text: string;
  confidence: "high" | "medium" | "low";
}

const EXTRACTION_PROMPT = `You are an expert medical bill reader. Extract all structured data from this hospital bill image.

Return a JSON object with these fields:
{
  "hospital_name": string,
  "date_of_service": string (MM/DD/YYYY),
  "account_number": string,
  "patient_name": string,
  "bill_type": "er" | "hospital" | "urgent_care" | "other",
  "state": string (US state),
  "insurance_status": "insured" | "uninsured" | "underinsured",
  "total_charges": number,
  "line_items": [
    {
      "description": string,
      "cpt_code": string | null,
      "revenue_code": string | null,
      "quantity": number,
      "unit_charge": number,
      "total_charge": number
    }
  ],
  "raw_text": string (full OCR text of the bill),
  "confidence": "high" | "medium" | "low"
}

Be thorough — extract EVERY line item. If a field isn't visible, use your best judgment or null.
Return ONLY valid JSON, no markdown fences.`;

export async function POST(request: NextRequest) {
  const clientKey = request.headers.get("x-api-key");
  const apiKey = clientKey || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "No API key provided. Please enter your Anthropic API key." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  let mediaType: "image/jpeg" | "image/png" | "image/webp" | "image/gif" = "image/jpeg";
  if (file.type === "image/png") mediaType = "image/png";
  else if (file.type === "image/webp") mediaType = "image/webp";
  else if (file.type === "application/pdf") {
    // For PDFs, we'll treat as a document and extract text differently
    // Claude vision can handle PDF pages as images
    mediaType = "image/jpeg"; // fallback; real implementation would convert PDF pages
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64 },
            },
            { type: "text", text: EXTRACTION_PROMPT },
          ],
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Parse JSON from response (handle potential markdown fences)
    const jsonStr = text.replace(/^```json?\s*/, "").replace(/\s*```$/, "").trim();
    const extraction: ExtractionResult = JSON.parse(jsonStr);

    return NextResponse.json(extraction);
  } catch (error) {
    return NextResponse.json(
      { error: `Extraction failed: ${String(error)}` },
      { status: 500 },
    );
  }
}
