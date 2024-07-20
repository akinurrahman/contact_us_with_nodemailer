"use client"
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.message.trim() === ""
    ) {
      toast.error("Please Fill All the Fields!");
      return;
    }

    const html = `
    Name: ${formData.name}
    Email: ${formData.email}
    Message: ${formData.message}
    `;

    try {
      const response = axios.post("/api/contact-form", {
        data: html,
        email: formData.email,
      });

      toast.promise(response, {
        pending: "Please Wait!!",
        success: "Message Sent Successfully!!",
        error: "Something Went Wrong! Please try again!",
      });
      // setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex text-black justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
          Contact Us
        </h2>

        <div className="mb-5">
          <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Submit
          </button>
        </div>

        {status && <p className="mt-4 text-center text-gray-800">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
