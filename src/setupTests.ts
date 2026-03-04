import "@testing-library/jest-dom";

import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Clean up the DOM after each test to prevent test interference
afterEach(() => {
  cleanup();
});

// Extend expect with custom matchers if needed (optional)
expect.extend({});
