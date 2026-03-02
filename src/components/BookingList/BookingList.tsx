import { useBookings } from "../../hooks/useBookings";
import { ListContainer, ListItem } from "./styles";

export function BookingList() {
  const { bookings } = useBookings();

  if (bookings.length === 0) {
    return <p>No bookings yet.</p>;
  }

  return (
    <ListContainer>
      {bookings.map((b) => (
        <ListItem key={b.id}>
          <div>
            <strong>{b.guestName}</strong>
            <span>
              {b.start} → {b.end}
            </span>
          </div>

          <div>
            <span>${b.price.toFixed(2)}</span>
            <small>{b.propertyId}</small>
          </div>
        </ListItem>
      ))}
    </ListContainer>
  );
}
