import { create } from "zustand";
import { Booking } from "../types/booking";

interface BookingState {
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  updateBooking: (id: string, data: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  addBooking: () => {},
  updateBooking: () => {},
  deleteBooking: () => {},
}));
