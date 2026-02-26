import { useBookingStore } from "../store/bookings";

export function useBookings() {
  const bookings = useBookingStore((s) => s.bookings);
  const addBooking = useBookingStore((s) => s.addBooking);
  const updateBooking = useBookingStore((s) => s.updateBooking);
  const deleteBooking = useBookingStore((s) => s.deleteBooking);

  return {
    bookings,
    addBooking,
    updateBooking,
    deleteBooking,
  };
}
