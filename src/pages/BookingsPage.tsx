import { BookingForm } from "../components/BookingForm/BookingForm";
import { BookingList } from "../components/BookingList/BookingList";

export function BookingsPage() {
  return (
    <div>
      <h1>Bookings</h1>
      <BookingForm />
      <BookingList />
    </div>
  );
}
