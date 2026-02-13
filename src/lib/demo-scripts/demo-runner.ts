import { type AuditEvent } from "@/lib/types";

export type ScriptEntry = {
  event: AuditEvent;
  delay_ms: number;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getScript(demoId: string): Promise<ScriptEntry[]> {
  switch (demoId) {
    case "er": {
      const { ER_DEMO_SCRIPT } = await import("./er-demo");
      return ER_DEMO_SCRIPT;
    }
    case "baby": {
      const { BABY_DEMO_SCRIPT } = await import("./baby-demo");
      return BABY_DEMO_SCRIPT;
    }
    case "collections": {
      const { COLLECTIONS_DEMO_SCRIPT } = await import("./collections-demo");
      return COLLECTIONS_DEMO_SCRIPT;
    }
    default:
      throw new Error(`Unknown demo: ${demoId}`);
  }
}

export function streamDemoEvents(demoId: string, speed: number = 1): Response {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const script = await getScript(demoId);
        for (const entry of script) {
          await sleep(entry.delay_ms / speed);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(entry.event)}\n\n`)
          );
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "error", message: String(err) })}\n\n`)
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
