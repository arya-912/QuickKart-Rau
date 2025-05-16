// components/FeatureSection.js
import React from "react";

export default function FeatureSection() {
  return (
    <section className="bg-gray-100 p-12 text-center md:text-left md:flex md:items-center md:justify-between">
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-2">Explore QuickKart: Your Local Shopping Solution</h2>
        <p className="mb-4">Connect with nearby sellers and enjoy personalized shopping experiences.</p>
        <button className="bg-purple-900 text-white px-4 py-2 rounded">Learn More</button>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0">
        <img src="https://via.placeholder.com/300" alt="Feature" className="mx-auto" />
      </div>
    </section>
  );
}
