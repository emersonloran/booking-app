import { describe, it, expect } from "vitest";
import { hasOverlap } from "./date";
import type { Booking } from "../types/booking";

function bookingFactory(overrides: Partial<Booking> = {}): Booking {
  return {
    id: "1",
    propertyId: "p1",
    start: "2024-01-10",
    end: "2024-01-15",
    guestName: "John",
    price: 100,
    ...overrides,
  };
}

describe("hasOverlap", () => {
  it("returns false when there are no existing bookings", () => {
    const newBooking = bookingFactory();
    expect(hasOverlap(newBooking, [])).toBe(false);
  });

  it("returns false when bookings are for different properties", () => {
    const newBooking = bookingFactory({ propertyId: "p1" });

    const existing = [
      bookingFactory({
        id: "2",
        propertyId: "p2",
      }),
    ];

    expect(hasOverlap(newBooking, existing)).toBe(false);
  });

  it("returns true when date ranges fully overlap", () => {
    const newBooking = bookingFactory({
      start: "2024-01-12",
      end: "2024-01-20",
    });

    const existing = [
      bookingFactory({
        id: "2",
        start: "2024-01-10",
        end: "2024-01-15",
      }),
    ];

    expect(hasOverlap(newBooking, existing)).toBe(true);
  });

  it("returns true when new booking starts inside an existing one", () => {
    const newBooking = bookingFactory({
      start: "2024-01-12",
      end: "2024-01-13",
    });

    const existing = [
      bookingFactory({
        id: "2",
        start: "2024-01-10",
        end: "2024-01-15",
      }),
    ];

    expect(hasOverlap(newBooking, existing)).toBe(true);
  });

  it("returns true when new booking ends inside an existing one", () => {
    const newBooking = bookingFactory({
      start: "2024-01-08",
      end: "2024-01-13",
    });

    const existing = [
      bookingFactory({
        id: "2",
        start: "2024-01-10",
        end: "2024-01-15",
      }),
    ];

    expect(hasOverlap(newBooking, existing)).toBe(true);
  });

  it("returns false when new booking is completely before existing", () => {
    const newBooking = bookingFactory({
      start: "2024-01-01",
      end: "2024-01-05",
    });

    const existing = [
      bookingFactory({
        id: "2",
        start: "2024-01-10",
        end: "2024-01-15",
      }),
    ];

    expect(hasOverlap(newBooking, existing)).toBe(false);
  });

  it("returns false when new booking is completely after existing", () => {
    const newBooking = bookingFactory({
      start: "2024-01-20",
      end: "2024-01-25",
    });

    const existing = [
      bookingFactory({
        id: "2",
        start: "2024-01-10",
        end: "2024-01-15",
      }),
    ];

    expect(hasOverlap(newBooking, existing)).toBe(false);
  });

  it("returns true when dates exactly touch (same start or end)", () => {
    const newBooking = bookingFactory({
      start: "2024-01-15",
      end: "2024-01-20",
    });

    const existing = [
      bookingFactory({
        id: "2",
        start: "2024-01-10",
        end: "2024-01-15",
      }),
    ];

    expect(hasOverlap(newBooking, existing)).toBe(true);
  });

  it("ignores the booking being edited when ignoreId is passed", () => {
    const newBooking = bookingFactory({
      id: "1",
      start: "2024-01-12",
      end: "2024-01-18",
    });

    const existing = [
      bookingFactory({
        id: "1",
        start: "2024-01-10",
        end: "2024-01-15",
      }),
    ];

    expect(hasOverlap(newBooking, existing, "1")).toBe(false);
  });
});
