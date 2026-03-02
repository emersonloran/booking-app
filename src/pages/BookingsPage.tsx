import { BookingForm } from "../components/BookingForm/BookingForm";
import { BookingList } from "../components/BookingList/BookingList";
import { PageContainer, Title } from "./styles";

export function BookingsPage() {
  return (
    <PageContainer>
      <Title>Bookings</Title>
      <BookingForm />
      <BookingList />
    </PageContainer>
  );
}
