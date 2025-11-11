import React from "react";
import { Truck, Package, Globe, Clock, MapPin, Search } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Freight & Shipping",
      description:
        "Reliable ground, air, and sea freight services for domestic and international deliveries. We make sure your cargo arrives safely and on time.",
      icon: <Truck className="w-10 h-10 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Warehousing",
      description:
        "Secure, efficient, and strategically located warehouses to handle all your storage and fulfillment needs with care and precision.",
      icon: <Package className="w-10 h-10 text-indigo-500" />,
      color: "bg-indigo-50",
    },
    {
      title: "Global Distribution",
      description:
        "Seamless worldwide distribution with customs support and full coordination across 50+ countries through our trusted network.",
      icon: <Globe className="w-10 h-10 text-teal-500" />,
      color: "bg-teal-50",
    },
    {
      title: "Real-Time Tracking",
      description:
        "Stay informed every step of the way with live shipment tracking and instant delivery updates accessible 24/7.",
      icon: <Clock className="w-10 h-10 text-amber-500" />,
      color: "bg-amber-50",
    },
    {
      title: "Last-Mile Delivery",
      description:
        "Fast and reliable last-mile solutions designed to ensure on-time delivery and complete visibility for your customers.",
      icon: <MapPin className="w-10 h-10 text-green-500" />,
      color: "bg-green-50",
    },
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <img
          src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
          alt="Logistics services"
          className="w-full h-[420px] object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-3">
            Our <span className="text-blue-500">Services</span>
          </h1>
          <p className="text-lg max-w-2xl text-gray-200">
            Delivering trusted logistics solutions from freight and warehousing
            to end-to-end shipment tracking built for efficiency and
            reliability.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Logistics That Move You Forward
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our comprehensive logistics services ensure your goods move quickly,
            safely, and transparently — wherever they need to go.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ${service.color}`}
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Shipment Tracking Section */}
      <section className="bg-white py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Track Your Shipment
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Enter your tracking ID to get the latest status and delivery updates
          for your shipment in real-time.
        </p>

        <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            className="w-full md:flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            <Search className="w-5 h-5" />
            Track
          </button>
        </form>
      </section>

      {/* Footer Accent */}
      <div className="h-4 bg-blue-500 w-full"></div>
    </div>
  );
};

export default Services;
