import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/contact", {
        name,
        email,
        message,
      });
      // Display success notification
      toast.success(response.data.message, { position: "top-right" });
      // Clear the form fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      // Display error notification
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again.",
        { position: "top-right" }
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-6"
    >
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Have any questions or feedback? We'd love to hear from you!
        </p>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default Contact;
