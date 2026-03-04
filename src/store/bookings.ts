import { create } from "zustand";
import type { Booking } from "../types/booking";
import { hasOverlap } from "../utils/date";

interface BookingState {
  bookings: Booking[];
  addBooking: (b: Omit<Booking, "id">) => void;
  updateBooking: (id: string, data: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;

  editingBooking: Booking | null;
  startEditing: (booking: Booking) => void;
  stopEditing: () => void;

  __reset: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => {
  let counter = 1;

  return {
    bookings: [],

    addBooking: (b) => {
      const newBooking: Booking = { ...b, id: `id-${counter++}` };
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

      const updated = { ...current, ...data };

      if (hasOverlap(updated, existing, id)) {
        throw new Error("Overlapping booking");
      }

      set({
        bookings: existing.map((b) => (b.id === id ? updated : b)),
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

    __reset: () => {
      counter = 1;
      set({ bookings: [], editingBooking: null });
    },
  };
});
