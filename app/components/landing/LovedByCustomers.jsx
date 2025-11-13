import React from "react";

const testimonials = [
  {
    text: "OmniCargo Logistics has completely transformed how we manage our freight shipments  faster, clearer, and more reliable than ever.",
    company: "SwiftLine Imports",
    bg: "bg-blue-100",
  },
  {
    text: "Working with OmniCargo feels effortless. The platform is user-friendly, transparent, and makes tracking shipments feel like second nature.",
    company: "Northway Trading Co.",
    bg: "bg-orange-100",
  },
  {
    text: "We’ve saved over 700 hours a year in manual coordination since switching to OmniCargo.",
    company: "LogiCore Distribution",
    bg: "bg-purple-100",
  },
  {
    text: "OmniCargo isn’t just a logistics company they’re a true partner. Their team goes above and beyond to ensure our freight moves smoothly worldwide.",
    company: "James K., Supply Chain Manager",
    bg: "bg-green-100",
  },
  {
    text: "The 24/7 tracking and instant updates have been game-changing for our operations. We never miss a delivery milestone anymore.",
    company: "Ajinkya Y., Operations Director",
    bg: "bg-yellow-100",
  },
  {
    text: "Our average delivery coordination time dropped from 30 minutes to 5 minutes with OmniCargo’s platform.",
    company: "FreightWave Partners",
    bg: "bg-pink-100",
  },
  {
    text: "OmniCargo’s AI-driven analytics give us real-time insights into costs and performance we’ve optimized our routes like never before.",
    company: "TransEdge Logistics",
    bg: "bg-teal-100",
  },
  {
    text: "Their customer support is phenomenal. OmniCargo’s team responds within minutes and always finds a solution — no matter the time zone.",
    company: "BrightPort Exports",
    bg: "bg-red-100",
  },
  {
    text: "Expanding internationally was seamless with OmniCargo. Their global network and customs expertise made complex shipping effortless.",
    company: "Vertex Global Trade",
    bg: "bg-indigo-100",
  },
];

const LovedByCustomers = () => {
  return (
    <section className="bg-white text-black py-16 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Loved by our customers</h2>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee space-x-6">
          {testimonials.concat(testimonials).map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-80 p-6 rounded-xl shadow-md ${item.bg}`}
            >
              <p className="text-lg leading-relaxed mb-4">“{item.text}”</p>
              <p className="font-semibold text-sm text-gray-700">
                — {item.company}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LovedByCustomers;
