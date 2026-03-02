import { useBookings } from "../../hooks/useBookings";
import { ListContainer, ListItem, DeleteButton, EditButton } from "./styles";
import { formatDate, formatPrice } from "../../utils/format";

export function BookingList() {
  const { bookings, deleteBooking, startEditing } = useBookings();

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
              {formatDate(b.start)} → {formatDate(b.end)}
            </span>
          </div>

          <div>
            <span>{formatPrice(b.price)}</span>
            <small>{b.propertyId}</small>
          </div>

          <div>
            <EditButton onClick={() => startEditing(b)}>Edit</EditButton>
            <DeleteButton onClick={() => deleteBooking(b.id)}>✕</DeleteButton>
          </div>
        </ListItem>
      ))}
    </ListContainer>
  );
}
