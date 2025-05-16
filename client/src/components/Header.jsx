import React from "react";

export default function Header() {
  return (
    <header className="bg-white-300 text-black px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">QuickKart</div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Contact</a>
        <button className="bg-white text-purple-900 px-4 py-1 rounded hover:bg-gray-100">Login</button>
      </nav>
    </header>
  );
}
