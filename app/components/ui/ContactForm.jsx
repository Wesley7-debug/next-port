"use client";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";

export default function ContactForm() {
  const formRef = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_g9c1t1u",
        "template_1pmwlnp",
        formRef.current,
        "Rl3QYtQktGB6pb7cw"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          alert("Failed to send message. Try again.");
        }
      );
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>

      {/* 🔥 Added: ref & onSubmit ONLY */}
      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="bg-white shadow-md rounded-xl p-8 space-y-6"
      >
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="user_name" // 🔥 ADDED for EmailJS
            placeholder="Enter your name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="user_email" // 🔥 ADDED
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            rows="4"
            name="message" // 🔥 ADDED
            placeholder="Write your message..."
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          <Send className="w-5 h-5" />
          Send Message
        </button>
      </form>
    </div>
  );
}
