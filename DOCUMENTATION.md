📌 Booking App — Architecture & Code Documentation

This document describes the system architecture, design decisions, business rules, and code organization of the Booking App.

🏛 1. High-Level Overview

The application is a small booking management system built with:

- React 18
- React Hook Form + Zod for form validation
- Zustand for global state management
- Styled Components for UI styling

The system allows the user to:

- Create bookings
- Edit bookings
- Delete bookings
- Validate date overlaps
- Enforce basic form validation rules

🧱 2. Architecture Structure
src/
├─ components/
│ ├─ BookingForm/
│ │ ├─ BookingForm.tsx
│ │ └─ styles.ts
│ ├─ BookingList/
│ │ ├─ BookingList.tsx
│ │ └─ styles.ts
├─ hooks/
│ └─ useBookings.ts
├─ store/
│ └─ bookings.ts
├─ utils/
│ ├─ date.ts
│ └─ format.ts
├─ pages/
│ ├─ BookingsPage.tsx
│ └─ styles.ts
├─ types/
│ └─ booking.ts
├─ App.tsx

🎯 3. Key Design Decisions
(1) Zustand for State Management

Zustand was chosen instead of Redux because:

- Lightweight (<1kb)
- Simple API with hooks
- No boilerplate
- Perfect for small/medium apps

The store keeps:

bookings: Booking[]
addBooking()
updateBooking()
deleteBooking()
editingBooking
startEditing()
stopEditing()

(2) Validation Using Zod + React Hook Form

Reasons:

- Zod provides declarative, typed schemas
- Prevents invalid data before it reaches the state
- Schema enforces:
  - propertyId required
  - start/end required
  - guest name required
  - price must be numeric

Example:

price: z.string().transform(Number)

This ensures the final data stored is correctly typed.

(3) Date Overlap Protection

Business rule:

- A property cannot have two bookings that overlap in time.

Implementation:

- adding or updating a booking:
  - existing bookings are checked
  - for updates, the current booking ID is ignored

- If overlap is detected, an exception is thrown
- The form UI shows the error elegantly (no alerts)

Function located in utils/date.ts.

(4) React Hook Form + React Compiler Issue

Because of a React Compiler limitation, the top of BookingForm.tsx includes:

"use no memo";

This disables React Compiler on that file to avoid false validation errors.

📝 4. Component-Level Responsibilities
BookingForm

- Holds the form responsible for creating/editing a booking
- Uses useForm() + Zod for validation
- Reactively fills fields when editing mode is active
- Displays inline input validation errors
- Uses a custom error box for business rule errors (overlap)

Flow:
User submits form →
Zod validates fields →
If editing:
updateBooking(id, data)
Else:
addBooking(data)
If success:
reset form + clear errors
If failure:
setFormError(message)

BookingList

- Displays all bookings sorted visually
- Allows deleting a booking
- Allows enabling edit mode by clicking an item
- Shows formatted dates and price

useBookings Hook

A convenience abstraction to the store:

- Maps Zustand selectors
- Prevents unnecessarily importing the store everywhere
- Unifies store state shape

Provides:
bookings
addBooking
updateBooking
deleteBooking

editingBooking
startEditing
stopEditing

Zustand Store (bookings.ts)

Responsible for:

- CRUD operations
- Overlap validation
- Immediate immutable updates
- No async logic (everything is synchronous)

Example update logic:

const updated = { ...current, ...data }
if (hasOverlap(updated, existing, id)) throw new Error("Overlapping booking")

Pages Layer (BookingsPage.tsx)

- Combines BookingForm + BookingList into a single layout
- No business logic
- Pure layout organization

⏱ 5. Business Rules Summary

✔ Required fields

- property
- start date
- end date
- guest name
- price

✔ Price must be numeric
✔ A booking cannot overlap another booking of the same property
✔ Editing a booking loads its values into the form
✔ Cancelling editing resets fields

🎨 6. UI/UX Decisions

- Styled Components for scoped, clean styling
- Simple and clean form layout
- Red inline errors for form fields
- Custom red error-box for business exceptions
- Layout centered and responsive
- No external UI libraries to keep project lightweight

🧪 7. Testing Strategy (soon)

🔚 8. Conclusion

This architecture keeps the project:

- modular
- easy to extend
- strongly typed
- predictable
- clean and maintainable
