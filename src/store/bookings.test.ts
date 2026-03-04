import { describe, it, expect, vi, beforeEach } from "vitest";
import { useBookingStore } from "./bookings";

vi.mock("uuid", () => ({
  v4: vi.fn(() => "id-1"),
}));

beforeEach(() => {
  useBookingStore.getState().__reset();
});

describe("useBookingStore", () => {
  it("adds a booking successfully", () => {
    useBookingStore.getState().addBooking({
      propertyId: "p1",
      start: "2024-01-01",
      end: "2024-01-02",
      guestName: "John",
      price: 100,
    });

    const state = useBookingStore.getState();
    expect(state.bookings[0]).toMatchObject({
      id: "id-1",
      guestName: "John",
    });
  });

  it("updates a booking successfully", () => {
    useBookingStore.getState().addBooking({
      propertyId: "p1",
      start: "2024-01-01",
      end: "2024-01-02",
      guestName: "John",
      price: 100,
    });

    useBookingStore.getState().updateBooking("id-1", {
      guestName: "Updated",
    });

    const state = useBookingStore.getState();
    expect(state.bookings[0].guestName).toBe("Updated");
  });

  it("starts and stops editing", () => {
    useBookingStore.getState().startEditing({
      id: "1",
      propertyId: "p1",
      start: "2024-01-01",
      end: "2024-01-02",
      guestName: "X",
      price: 10,
    });

    let state = useBookingStore.getState();
    expect(state.editingBooking?.id).toBe("1");

    useBookingStore.getState().stopEditing();
    state = useBookingStore.getState();

    expect(state.editingBooking).toBe(null);
  });
});
