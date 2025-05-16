// components/ProductBenefitsSection.js
import React from "react";
import BenefitCard from "./BenefitCard";

const benefits = [
  { title: "Empower Your Selling Experience", description: "Tools tailored for local vendors.", image: "https://via.placeholder.com/100" },
  { title: "Save Your Favorites with Bookmarks", description: "Easy access to preferred products.", image: "https://via.placeholder.com/100" },
  { title: "Seamless Navigation for All Users", description: "Designed for accessibility and speed.", image: "https://via.placeholder.com/100" },
];

export default function ProductBenefitsSection() {
  return (
    <section className="p-12 bg-white">
      <h2 className="text-2xl font-bold text-center mb-8">Discover Local Products with Ease</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </div>
    </section>
  );
}