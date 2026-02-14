import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./page";

// Mock framer-motion
jest.mock("framer-motion", () => {
  const proxy = ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
    const { initial, animate, exit, transition, ...rest } = props as Record<string, unknown>;
    void initial; void animate; void exit; void transition;
    return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  };
  return {
    motion: { div: proxy, span: proxy, img: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, transition, ...rest } = props as Record<string, unknown>;
      void initial; void animate; void exit; void transition;
      return <img {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />;
    }},
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  };
});

global.fetch = jest.fn();

describe("Home page - Upload state", () => {
  beforeEach(() => {
    render(<Home />);
  });

  test("renders BillShredder wordmark", () => {
    expect(screen.getByText("BillShredder")).toBeInTheDocument();
  });

  test("renders hero headline", () => {
    expect(screen.getByText("Your bill is wrong.")).toBeInTheDocument();
  });

  test("renders gold tagline", () => {
    expect(screen.getByText("Let's shred it.")).toBeInTheDocument();
  });

  test("renders upload zone with paste textarea", () => {
    expect(screen.getByText("Drop your bill here")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Or paste your itemized bill text here...")).toBeInTheDocument();
  });

  test("renders all three demo pills", () => {
    expect(screen.getByText("$47K ER Visit")).toBeInTheDocument();
    expect(screen.getByText("$32K Childbirth")).toBeInTheDocument();
    expect(screen.getByText("$8.5K in Collections")).toBeInTheDocument();
  });

  test("renders stats bar", () => {
    expect(screen.getByText("80% of hospital bills contain errors")).toBeInTheDocument();
    expect(screen.getByText("$220B in medical debt")).toBeInTheDocument();
  });

  test("shows Analyze Bill button when text is pasted", () => {
    const textarea = screen.getByPlaceholderText("Or paste your itemized bill text here...");
    fireEvent.change(textarea, { target: { value: "Some bill text" } });
    expect(screen.getByText("Analyze Bill")).toBeInTheDocument();
  });

  test("does not show Analyze Bill button when textarea is empty", () => {
    expect(screen.queryByText("Analyze Bill")).not.toBeInTheDocument();
  });
});

describe("Home page - Demo button sends correct API request", () => {
  test("clicking demo button in live mode calls fetch with bill_text", () => {
    const mockFetch = jest.fn().mockResolvedValue({
      body: {
        getReader: () => ({
          read: jest.fn().mockResolvedValue({ done: true, value: undefined }),
        }),
      },
    });
    global.fetch = mockFetch;

    render(<Home />);
    // In default (live) mode, clicking demo goes straight to audit
    fireEvent.click(screen.getByText("$47K ER Visit"));

    expect(mockFetch).toHaveBeenCalledWith("/api/audit", expect.objectContaining({
      method: "POST",
    }));

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.bill_text).toContain("99285");
    expect(body.bill_type).toBe("er");
    expect(body.state).toBe("California");
    expect(body.hospital_name).toBe("City General Hospital");
    expect(body.insurance_status).toBe("uninsured");
  });
});
