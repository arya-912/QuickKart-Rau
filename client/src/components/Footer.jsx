// components/Footer.js
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center text-sm">
      <div className="mb-4">&copy; 2025 QuickKart. All rights reserved.</div>
      <div className="flex justify-center space-x-4">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Support</a>
      </div>
    </footer>
  );
}