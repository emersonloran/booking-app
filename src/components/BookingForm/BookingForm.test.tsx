import { render, screen, fireEvent, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BookingForm } from "./BookingForm";
import type { Booking } from "../../types/booking";

let mockAdd = vi.fn();
let mockUpdate = vi.fn();
let mockDelete = vi.fn();
let mockStart = vi.fn();
let mockStop = vi.fn();

let editing: Booking | null = null;

vi.mock("../../hooks/useBookings", () => ({
  useBookings: () => ({
    bookings: [],
    addBooking: mockAdd,
    updateBooking: mockUpdate,
    deleteBooking: mockDelete,
    startEditing: mockStart,
    stopEditing: mockStop,
    editingBooking: editing,
  }),
}));

beforeEach(() => {
  mockAdd = vi.fn();
  mockUpdate = vi.fn();
  mockDelete = vi.fn();
  mockStart = vi.fn();
  mockStop = vi.fn();
  editing = null;
});

const fillForm = async () => {
  await act(async () =>
    fireEvent.change(screen.getByLabelText("Property"), {
      target: { value: "property-1" },
    }),
  );

  await act(async () =>
    fireEvent.input(screen.getByLabelText("Start Date"), {
      target: { value: "2024-01-01" },
    }),
  );

  await act(async () =>
    fireEvent.input(screen.getByLabelText("End Date"), {
      target: { value: "2024-01-02" },
    }),
  );

  await act(async () =>
    fireEvent.input(screen.getByLabelText("Guest Name"), {
      target: { value: "Alice" },
    }),
  );

  await act(async () =>
    fireEvent.input(screen.getByLabelText("Price"), {
      target: { value: "300" },
    }),
  );
};

describe("BookingForm", () => {
  it("creates a booking", async () => {
    await act(async () => render(<BookingForm />));
    await fillForm();

    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Create Booking" })),
    );

    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledWith({
      propertyId: "property-1",
      start: "2024-01-01",
      end: "2024-01-02",
      guestName: "Alice",
      price: 300,
    });
  });

  it("updates an existing booking", async () => {
    editing = {
      id: "abc",
      propertyId: "property-1",
      start: "2024-01-05",
      end: "2024-01-10",
      guestName: "John",
      price: 100,
    };

    await act(async () => render(<BookingForm />));

    await act(async () =>
      fireEvent.input(screen.getByLabelText("Guest Name"), {
        target: { value: "Updated Name" },
      }),
    );

    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Save Changes" })),
    );

    expect(mockUpdate).toHaveBeenCalledWith(
      "abc",
      expect.objectContaining({ guestName: "Updated Name" }),
    );
    expect(mockStop).toHaveBeenCalledTimes(1);
  });

  it("shows overlap error", async () => {
    mockAdd.mockImplementation(() => {
      throw new Error("Overlapping booking");
    });

    await act(async () => render(<BookingForm />));
    await fillForm();

    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Create Booking" })),
    );

    expect(await screen.findByText("Overlapping booking")).toBeInTheDocument();
  });
});
