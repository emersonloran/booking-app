import { describe, it, expect } from "vitest";
import { formatDate, formatPrice } from "./format";

describe("format utils", () => {
  it("formats date correctly", () => {
    expect(formatDate("2024-01-01T00:00:00Z")).toBe("Jan 1, 2024");
  });

  it("formats price correctly", () => {
    expect(formatPrice(123.45)).toBe("$123.45");
  });
});
