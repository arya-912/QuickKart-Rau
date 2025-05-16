// components/BenefitCard.js
import React from "react";

export default function BenefitCard({ title, description, image }) {
  return (
    <div className="bg-gray-100 p-6 rounded shadow text-center">
      <img src={image} alt={title} className="mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
