import { create } from "zustand";
import type { Booking } from "../types/booking";
import { hasOverlap } from "../utils/date";
import { v4 as uuid } from "uuid";

interface BookingState {
  bookings: Booking[];
  addBooking: (b: Omit<Booking, "id">) => void;
  updateBooking: (id: string, data: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;

  editingBooking: Booking | null;
  startEditing: (booking: Booking) => void;
  stopEditing: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],

  addBooking: (b) => {
    const newBooking: Booking = { ...b, id: uuid() };
    const existing = get().bookings;

    if (hasOverlap(newBooking, existing)) {
      throw new Error("Overlapping booking");
    }

    set({ bookings: [...existing, newBooking] });
  },

  updateBooking: (id, data) => {
    const existing = get().bookings;
    const current = existing.find((b) => b.id === id);
    if (!current) return;

    const updatedBooking: Booking = { ...current, ...data };

    if (hasOverlap(updatedBooking, existing, id)) {
      throw new Error("Overlapping booking");
    }

    set({
      bookings: existing.map((b) => (b.id === id ? updatedBooking : b)),
    });
  },

  deleteBooking: (id) => {
    set({
      bookings: get().bookings.filter((b) => b.id !== id),
    });
  },

  editingBooking: null,

  startEditing: (booking) => set({ editingBooking: booking }),

  stopEditing: () => set({ editingBooking: null }),
}));
