import "@testing-library/jest-dom";

// Polyfill Request for API route tests
if (typeof Request === "undefined") {
  // @ts-expect-error - minimal polyfill
  global.Request = class Request {
    constructor(public url: string, public init?: RequestInit) {}
  };
}
