// components/ExperienceSection.js
import React from "react";

export default function ExperienceSection() {
  return (
    <section className="bg-gray-100 p-12 md:flex md:items-center md:justify-between">
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-2">A Tailored E-Commerce Experience for Local Sellers and Buyers</h2>
        <p className="mb-4">100% Local. Simple to use. Empowering your community.</p>
      </div>
      <div className="md:w-1/2">
        <img src="https://via.placeholder.com/300" alt="Experience" className="mx-auto" />
      </div>
    </section>
  );
}