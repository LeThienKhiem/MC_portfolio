"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { User, Phone, Mail, Calendar, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    booking_date: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          full_name: formData.full_name,
          phone: formData.phone,
          email: formData.email,
          booking_date: formData.booking_date,
          notes: formData.notes || null,
          status: "pending",
        },
      ]);

      if (error) throw error;

      setSubmitStatus("success");
      setFormData({
        full_name: "",
        phone: "",
        email: "",
        booking_date: "",
        notes: "",
      });
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4" style={{ backgroundColor: "#F2E9E4" }}>
      <div className="max-w-2xl mx-auto">
        <div
          className="bg-white rounded-lg shadow-lg p-8"
          style={{ border: "1px solid #BFBCBA" }}
        >
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "#403F3D", fontFamily: "var(--font-playfair), serif" }}
          >
            Book Your Event
          </h2>

          {submitStatus === "success" && (
            <div
              className="mb-6 p-4 rounded-lg flex items-center gap-3"
              style={{ backgroundColor: "#F2E9E4", border: "1px solid #BFBCBA" }}
            >
              <CheckCircle className="w-5 h-5" style={{ color: "#403F3D" }} />
              <p style={{ color: "#0D0D0D" }}>
                Booking submitted successfully! We'll contact you soon.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div
              className="mb-6 p-4 rounded-lg flex items-center gap-3"
              style={{ backgroundColor: "#F2E9E4", border: "1px solid #BFBCBA" }}
            >
              <AlertCircle className="w-5 h-5" style={{ color: "#737272" }} />
              <p style={{ color: "#0D0D0D" }}>{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium mb-2"
                style={{ color: "#0D0D0D" }}
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "#737272" }}
                />
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-0"
                  style={{
                    borderColor: "#BFBCBA",
                    backgroundColor: "#FFFFFF",
                    color: "#0D0D0D",
                  }}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-2"
                style={{ color: "#0D0D0D" }}
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "#737272" }}
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-0"
                  style={{
                    borderColor: "#BFBCBA",
                    backgroundColor: "#FFFFFF",
                    color: "#0D0D0D",
                  }}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: "#0D0D0D" }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "#737272" }}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-0"
                  style={{
                    borderColor: "#BFBCBA",
                    backgroundColor: "#FFFFFF",
                    color: "#0D0D0D",
                  }}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Booking Date */}
            <div>
              <label
                htmlFor="booking_date"
                className="block text-sm font-medium mb-2"
                style={{ color: "#0D0D0D" }}
              >
                Preferred Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "#737272" }}
                />
                <input
                  type="date"
                  id="booking_date"
                  name="booking_date"
                  required
                  value={formData.booking_date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-0"
                  style={{
                    borderColor: "#BFBCBA",
                    backgroundColor: "#FFFFFF",
                    color: "#0D0D0D",
                  }}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium mb-2"
                style={{ color: "#0D0D0D" }}
              >
                Additional Notes
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-3 top-4 w-5 h-5"
                  style={{ color: "#737272" }}
                />
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none"
                  style={{
                    borderColor: "#BFBCBA",
                    backgroundColor: "#FFFFFF",
                    color: "#0D0D0D",
                  }}
                  placeholder="Tell us about your event (optional)"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#403F3D",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "#2D2C2A";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "#403F3D";
                }
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

