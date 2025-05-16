// components/HeroSection.js
import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-purple-900 text-white text-center p-16">
      <h1 className="text-4xl font-bold mb-4">Discover Local Treasures with QuickKart</h1>
      <p className="mb-8">Find and shop from local vendors easily</p>
      <div className="flex justify-center gap-4">
        <button className="bg-white text-purple-900 px-6 py-2 rounded">Get Started</button>
        <button className="border border-white px-6 py-2 rounded">Learn More</button>
      </div>
    </section>
  );
}



