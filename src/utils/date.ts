import { isBefore, isAfter } from "date-fns";
import type { Booking } from "../types/booking";

export function hasOverlap(
  newBooking: Booking,
  existing: Booking[],
  ignoreId?: string,
) {
  const newStart = new Date(newBooking.start);
  const newEnd = new Date(newBooking.end);

  return existing.some((booking) => {
    if (ignoreId && booking.id === ignoreId) return false;

    if (booking.propertyId !== newBooking.propertyId) return false;

    const start = new Date(booking.start);
    const end = new Date(booking.end);

    const overlaps = !(isAfter(newStart, end) || isBefore(newEnd, start));

    return overlaps;
  });
}
