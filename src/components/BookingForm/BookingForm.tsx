"use no memo";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBookings } from "../../hooks/useBookings";
import { FormContainer } from "./styles";
import { useEffect, useState } from "react";

const bookingSchema = z.object({
  propertyId: z.string().min(1, "Select a property"),
  start: z.string().min(1, "Start date is required"),
  end: z.string().min(1, "End date is required"),
  guestName: z.string().min(1, "Guest name is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a number",
    })
    .transform((val) => Number(val)),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const { addBooking, updateBooking, editingBooking, stopEditing } =
    useBookings();

  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      propertyId: "",
      start: "",
      end: "",
      guestName: "",
      price: "",
    },
  });

  useEffect(() => {
    if (editingBooking) {
      reset({
        propertyId: editingBooking.propertyId,
        start: editingBooking.start,
        end: editingBooking.end,
        guestName: editingBooking.guestName,
        price: editingBooking.price.toString(),
      });
    }
  }, [editingBooking, reset]);

  const clearForm = () =>
    reset({
      propertyId: "",
      start: "",
      end: "",
      guestName: "",
      price: "",
    });

  const onSubmit = (data: BookingFormData) => {
    try {
      if (editingBooking) {
        updateBooking(editingBooking.id, data);
        stopEditing();
      } else {
        addBooking(data);
      }

      setFormError(null);
      clearForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setFormError(message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <h2>{editingBooking ? "Edit Booking" : "Create Booking"}</h2>

      {formError && <div className="error-box">{formError}</div>}

      <label htmlFor="propertyId">Property</label>
      <select id="propertyId" {...register("propertyId")}>
        <option value="">Select...</option>
        <option value="property-1">Property 1</option>
        <option value="property-2">Property 2</option>
      </select>
      {errors.propertyId && <span>{errors.propertyId.message}</span>}

      <label htmlFor="start">Start Date</label>
      <input id="start" type="date" {...register("start")} />
      {errors.start && <span>{errors.start.message}</span>}

      <label htmlFor="end">End Date</label>
      <input id="end" type="date" {...register("end")} />
      {errors.end && <span>{errors.end.message}</span>}

      <label htmlFor="guestName">Guest Name</label>
      <input id="guestName" type="text" {...register("guestName")} />
      {errors.guestName && <span>{errors.guestName.message}</span>}

      <label htmlFor="price">Price</label>
      <input id="price" type="number" step="0.01" {...register("price")} />
      {errors.price && <span>{errors.price.message}</span>}

      <button type="submit">
        {editingBooking ? "Save Changes" : "Create Booking"}
      </button>

      {editingBooking && (
        <button
          type="button"
          onClick={() => {
            stopEditing();
            clearForm();
            setFormError(null);
          }}
        >
          Cancel Edit
        </button>
      )}
    </FormContainer>
  );
}
