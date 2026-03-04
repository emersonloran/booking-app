# 🏁 Booking App

A small booking management system built with **React**, **Zustand**, **React Hook Form**, and **Zod**, designed for technical evaluation and clean architecture demonstration.

This project implements:
* **Creating bookings**
* **Editing bookings**
* **Deleting bookings**
* **Preventing overlapping reservations**
* **Form validation with typed schemas**
* **Organized UI and modular components**
* **Full automated test coverage**

## 🚀 Tech Stack

* **UI Components:** React 18 + Styled Components
* **Forms & Validation:** React Hook Form + Zod
* **State Management:** Zustand
* **Date Utilities:** date-fns
* **Testing:** Vitest + React Testing Library
* **Build Tool:** Vite

---

## 📦 Installation

**Clone the repository:**
```bash
git clone https://github.com/emersonloran/booking-app.git
cd booking-app
```

**Install dependencies:**
```bash
npm install
```

**▶ Running the Application**

**Start the development server:**
```bash
npm run dev
```
Vite will print a local URL such as: http://localhost:5173/

**🧪 Running Tests**

**The test suite uses Vitest and includes:**
* **Unit tests**
* **Component tests**
* **Integration tests**
**Run tests:**
```bash
npx vitest --run
```

**🗂 Project Structure**
```bash
src/
├─ components/
│  ├─ BookingForm/
│  ├─ BookingList/
├─ hooks/
│  └─ useBookings.ts
├─ store/
│  └─ bookings.ts
├─ utils/
│  ├─ date.ts
│  └─ format.ts
├─ pages/
│  └─ BookingsPage.tsx
├─ types/
│  └─ booking.ts
└─ App.tsx
```

**🧱 Architecture Overview**
**The app follows a clean and modular architecture:**

**1. Zustand Store**
* **Handles business rules and state:**
* **bookings list**
* **add/update/delete operations**
* **editing state**
* **date overlap validation**

**2. React Hook Form + Zod**

**The form is fully typed and validated before any state update.**

**3. UI Components**

**Isolated and focused:**

* **BookingForm → handles creation/editing**
* **BookingList → displays bookings and actions**

**4. Utility Layer**

**Pure functions:**
* **formatDate**
* **formatPrice**
* **hasOverlap (date business rule)**

**🧪 Testing Strategy**

**This project includes a full automated test suite covering:**
* **Business rules**
* **Date overlap detection**
* **Form behavior**
* **UI rendering**
* **Zustand state transitions**
* **Integration of BookingForm + BookingList**

**[!NOTE]
Each test suite resets the state using a built-in deterministic reset method.**

**📝 Business Rules Summary**

✔ Property is required

✔ Dates are required

✔ Guest name required

✔ Price must be numeric

✔ A booking cannot overlap another booking on the same property

✔ Editing a booking must load it into the form

✔ Cancelling editing resets the form

**🧩 Example Booking Object**
```bash
{
  "id": "id-1",
  "propertyId": "property-1",
  "start": "2024-01-10",
  "end": "2024-01-12",
  "guestName": "John Doe",
  "price": 250
}
```

**🧼 Code Quality & Conventions**
* **All code is written in TypeScript**
* **Strong typing at boundaries**
* **No implicit any**
* **State mutations are immutable**
* **No side effects inside components**
* **All store logic is pure and testable**

**👨‍💻 Development Scripts**
* **npm run dev:** Run development server
* **npm run build:** Create production build
* **npm run preview:** Preview production build
* **npx vitest --run:** Test in CI mode

**📬 Contact**

If you have any questions or want to discuss any design decisions, feel free to reach out.
