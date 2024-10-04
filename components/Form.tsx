"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import PaddingContainer from "./layout/PaddingContainer";
import directus from "@/lib/directus";
import { createItem } from "@directus/sdk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp?: string; // Optional timestamp field
};

const Form = () => {
  const {
    register,
    handleSubmit,
    reset, // To reset the form after successful submission
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false); // State for submission in process
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // State for form submitted status

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true); // Start loading when form submission begins

    // Add current timestamp to data
    const currentDateTime = new Date().toISOString(); // Get current date and time in ISO format
    const dataWithTimestamp = {
      ...data,
      timestamp: currentDateTime, // Append timestamp to the data
    };

    try {
      await directus.request(createItem("messages", dataWithTimestamp));
      toast.success("Message sent successfully!");

      // Reset form after successful submission
      reset();
      setIsFormSubmitted(true); // Mark the form as submitted to disable the send button
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.log(error);
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  return (
    <PaddingContainer className="absolute bottom-5 left-0 max-w-xl justify-start items-end">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 text-xs">
        {/* Name Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            className="bg-stone-800 px-3 py-2 border border-white "
            {...register("name", { required: true })}
            disabled={loading || isFormSubmitted} // Disable input when loading or form submitted
          />
          {errors.name && <span>This field is required</span>}
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            className="bg-stone-800 px-3 py-2 border border-white"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            disabled={loading || isFormSubmitted} // Disable input when loading or form submitted
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        {/* Phone Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Phone No</label>
          <input
            id="phone"
            className="bg-stone-800 px-3 py-2 border border-white"
            {...register("phone", {
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone number must be numeric",
              },
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 digits",
              },
              maxLength: {
                value: 15,
                message: "Phone number must not exceed 15 digits",
              },
            })}
            disabled={loading || isFormSubmitted} // Disable input when loading or form submitted
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>

        {/* Message Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            rows={4}
            cols={50}
            className="bg-stone-800 px-3 py-2 border border-white"
            {...register("message", { required: true })}
            disabled={loading || isFormSubmitted} // Disable input when loading or form submitted
          />
          {errors.message && <span>This field is required</span>}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-2">
          <input
            className={`bg-white text-black py-2 px-3 mt-5 cursor-pointer font-semibold uppercase transition-colors duration-300 ${
              loading || isFormSubmitted
                ? "cursor-not-allowed opacity-50" // Style for disabled button
                : "hover:text-white hover:bg-black"
            }`}
            type="submit"
            value={loading ? "Sending..." : "Send"} // Show "Sending..." when loading
            disabled={loading || isFormSubmitted} // Disable button when loading or form submitted
          />
          <span>* Marked are Required</span>
        </div>
      </form>
      {/* Toast Container */}
      <ToastContainer />
    </PaddingContainer>
  );
};

export default Form;
