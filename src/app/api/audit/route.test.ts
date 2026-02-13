import { POST } from "./route";
import { NextRequest } from "next/server";

// Mock the Anthropic SDK
jest.mock("@anthropic-ai/sdk", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      messages: {
        create: jest.fn().mockImplementation(async ({ stream }) => {
          if (stream) {
            return {
              [Symbol.asyncIterator]: async function* () {
                yield {
                  type: "content_block_delta",
                  delta: {
                    type: "text_delta",
                    text: '{"type":"parsing","title":"Bill Identified","content":"ER visit bill","severity":"info"}\n',
                  },
                };
                yield {
                  type: "content_block_delta",
                  delta: {
                    type: "text_delta",
                    text: '{"type":"finding","title":"Upcoding","content":"Level 5 used","severity":"error","savings":5000}\n',
                  },
                };
              },
            };
          }
        }),
      },
    })),
  };
});

describe("POST /api/audit", () => {
  test("returns 400 for missing billText", async () => {
    const req = new NextRequest("http://localhost/api/audit", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("returns SSE stream for valid bill", async () => {
    const req = new NextRequest("http://localhost/api/audit", {
      method: "POST",
      body: JSON.stringify({ billText: "Test bill with 99285 code $47,440" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/event-stream");
  });

  test("streams valid JSON data events", async () => {
    const req = new NextRequest("http://localhost/api/audit", {
      method: "POST",
      body: JSON.stringify({ billText: "Test bill" }),
    });
    const res = await POST(req);
    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    let fullText = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fullText += decoder.decode(value, { stream: true });
    }

    // Should contain data: prefixed lines
    expect(fullText).toContain("data: ");
    // Should end with [DONE]
    expect(fullText).toContain("[DONE]");
  });
});
