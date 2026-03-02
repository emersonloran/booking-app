import { useBookingStore } from "../store/bookings";

export function useBookings() {
  const bookings = useBookingStore((s) => s.bookings);
  const addBooking = useBookingStore((s) => s.addBooking);
  const updateBooking = useBookingStore((s) => s.updateBooking);
  const deleteBooking = useBookingStore((s) => s.deleteBooking);

  const editingBooking = useBookingStore((s) => s.editingBooking);
  const startEditing = useBookingStore((s) => s.startEditing);
  const stopEditing = useBookingStore((s) => s.stopEditing);

  return {
    bookings,
    addBooking,
    updateBooking,
    deleteBooking,
    editingBooking,
    startEditing,
    stopEditing,
  };
}
