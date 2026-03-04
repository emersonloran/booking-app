import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BookingList } from "./BookingList";
import type { Booking } from "../../types/booking";

const mockDelete = vi.fn();
const mockStart = vi.fn();

let list: Booking[] = [];

vi.mock("../../hooks/useBookings", () => ({
  useBookings: () => ({
    bookings: list,
    deleteBooking: mockDelete,
    startEditing: mockStart,
  }),
}));

describe("BookingList", () => {
  it("renders empty state", () => {
    list = [];
    render(<BookingList />);
    expect(screen.getByText("No bookings yet.")).toBeInTheDocument();
  });

  it("renders and interacts with list", () => {
    list = [
      {
        id: "1",
        propertyId: "property-1",
        start: "2024-01-01",
        end: "2024-01-02",
        guestName: "Alice",
        price: 200,
      },
    ];

    render(<BookingList />);

    fireEvent.click(screen.getByText("Edit"));
    expect(mockStart).toHaveBeenCalledWith(list[0]);

    fireEvent.click(screen.getByText("✕"));
    expect(mockDelete).toHaveBeenCalledWith("1");
  });
});
