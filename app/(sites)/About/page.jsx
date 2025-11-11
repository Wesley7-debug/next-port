// import React from "react";

// const AboutUs = () => {
//   return (
//     <div className="font-sans text-gray-800 pt-20">
//       {/* Hero Section */}
//       <div className="relative">
//         <img
//           src="/images/express-car.jpg"
//           alt="Logistics trucks"
//           className="w-full h-[450px] object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40 flex flex-col justify-center pl-10 md:pl-20">
//           <p className="text-white/70 text-sm mb-2">About Us</p>
//           <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
//             <span className="text-orange-500">Driven</span> and Reliable
//           </h1>
//         </div>
//       </div>

//       {/* Description */}
//       <section className="bg-white py-16 px-6 md:px-20">
//         <h2 className="text-2xl md:text-3xl font-semibold mb-6">
//           We provide a wide range of logistics and supply chain solutions,
//           including freight forwarding, shipment tracking, and warehouse
//           management.
//         </h2>

//         <p className="text-gray-600 max-w-3xl leading-relaxed mb-12">
//           Our commitment to reliability and innovation drives everything we do.
//           We believe efficient logistics is the backbone of every successful
//           business, and we’re dedicated to making global trade smoother and
//           faster for everyone. That’s why we offer competitive pricing and
//           advanced tracking options to help streamline your logistics operations
//           from start to finish.
//         </p>

//         {/* Middle Image */}
//         <div className="relative">
//           <img
//             src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
//             alt="Cargo warehouse"
//             className="w-full rounded-lg"
//           />
//           <div className="absolute bottom-6 left-6 bg-black/60 text-white px-4 py-2 rounded">
//             <p className="text-lg font-semibold">
//               How logistics can <span className="text-blue-400">transform</span>{" "}
//               business.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Numbers Section */}
//       <section className="py-16 px-6 md:px-20 bg-gray-50 grid md:grid-cols-2 gap-12">
//         {/* Stats */}
//         <div>
//           <h3 className="text-blue-500 uppercase tracking-wider font-semibold mb-6">
//             Numbers
//           </h3>
//           <div className="grid grid-cols-2 gap-8 text-gray-800">
//             <div>
//               <p className="text-4xl font-bold text-blue-600">120+</p>
//               <p className="mt-2 text-sm">Global Hubs</p>
//             </div>
//             <div>
//               <p className="text-4xl font-bold text-blue-600">2,300+</p>
//               <p className="mt-2 text-sm">Shipments Daily</p>
//             </div>
//             <div>
//               <p className="text-4xl font-bold text-blue-600">99%</p>
//               <p className="mt-2 text-sm">On-Time Delivery</p>
//             </div>
//             <div>
//               <p className="text-4xl font-bold text-blue-600">50+</p>
//               <p className="mt-2 text-sm">Countries Served</p>
//             </div>
//           </div>
//         </div>

//         {/* Vision & Solutions */}
//         <div className="flex flex-col justify-between">
//           <div>
//             <h3 className="text-blue-500 uppercase tracking-wider font-semibold mb-4">
//               Our Vision
//             </h3>
//             <p className="text-gray-600 leading-relaxed mb-6">
//               Our mission is to redefine logistics through technology,
//               transparency, and trust. From order placement to real-time
//               tracking, we provide seamless experiences that empower businesses
//               worldwide.
//             </p>
//             <button className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-orange-700 transition">
//               Get a Quote
//             </button>
//           </div>

//           <div className="mt-10">
//             <h3 className="text-blue-500 uppercase tracking-wider font-semibold mb-4">
//               Our Solutions
//             </h3>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <p className="font-medium">01 Freight & Shipping</p>
//                 <button className="text-blue-600 text-xl">→</button>
//               </div>
//               <div className="flex justify-between items-center border-b pb-2">
//                 <p className="font-medium">02 Warehousing</p>
//                 <button className="text-blue-600 text-xl">→</button>
//               </div>
//               <div className="flex justify-between items-center border-b pb-2">
//                 <p className="font-medium">03 Real-Time Tracking</p>
//                 <button className="text-blue-600 text-xl">→</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer Accent */}
//       <div className="h-4 bg-blue-600 w-full"></div>
//     </div>
//   );
// };

// export default AboutUs;
import React from "react";
import { Truck, Package, Globe, Clock } from "lucide-react";
import Link from "next/link";
const AboutUs = () => {
  const services = [
    {
      title: "Freight & Shipping",
      description:
        "Reliable freight solutions for all routes — land, air, and sea.",
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Warehousing",
      description:
        "Secure and efficient storage with advanced inventory control.",
      icon: <Package className="w-8 h-8 text-indigo-500" />,
      color: "bg-indigo-50",
    },
    {
      title: "Global Distribution",
      description: "Cross-border logistics made simple and transparent.",
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      color: "bg-teal-50",
    },
    {
      title: "Real-Time Tracking",
      description: "Track your shipments anytime, anywhere with live updates.",
      icon: <Clock className="w-8 h-8 text-amber-500" />,
      color: "bg-amber-50",
    },
  ];

  return (
    <div className="font-sans text-gray-800 pt-20">
      {/* Hero Section */}
      <div className="relative">
        <img
          src="/images/express-car.jpg"
          alt="Logistics trucks"
          className="w-full h-[450px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center pl-10 md:pl-20">
          <p className="text-white/70 text-sm mb-2">About Us</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
            <span className="text-blue-500">Driven</span> and Reliable
          </h1>
        </div>
      </div>

      {/* Description */}
      <section className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          We provide a wide range of logistics and supply chain solutions,
          including freight forwarding, shipment tracking, and warehouse
          management.
        </h2>

        <p className="text-gray-600 max-w-3xl leading-relaxed mb-12">
          Our commitment to reliability and innovation drives everything we do.
          We believe efficient logistics is the backbone of every successful
          business, and we’re dedicated to making global trade smoother and
          faster for everyone. That’s why we offer competitive pricing and
          advanced tracking options to help streamline your logistics operations
          from start to finish.
        </p>

        {/* Middle Image */}
        <div className="relative">
          <img
            src="/images/airplane.jpg"
            alt="Cargo warehouse"
            className="w-full rounded-lg"
          />
          <div className="absolute bottom-6 left-6 bg-black/60 text-white px-4 py-2 rounded">
            <p className="text-lg font-semibold">
              How logistics can <span className="text-blue-400">transform</span>{" "}
              business.
            </p>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50 grid md:grid-cols-2 gap-12">
        {/* Stats */}
        <div>
          <h3 className="text-blue-500 uppercase tracking-wider font-semibold mb-6">
            Numbers
          </h3>
          <div className="grid grid-cols-2 gap-8 text-gray-800">
            <div>
              <p className="text-4xl font-bold text-blue-600">120+</p>
              <p className="mt-2 text-sm">Global Hubs</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">2,300+</p>
              <p className="mt-2 text-sm">Shipments Daily</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">99%</p>
              <p className="mt-2 text-sm">On-Time Delivery</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">50+</p>
              <p className="mt-2 text-sm">Countries Served</p>
            </div>
          </div>
        </div>

        {/* Vision & Solutions */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-blue-500 uppercase tracking-wider font-semibold mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our mission is to redefine logistics through technology,
              transparency, and trust. From order placement to real-time
              tracking, we provide seamless experiences that empower businesses
              worldwide.
            </p>
            <button className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 transition">
              Get a Quote
            </button>
          </div>

          <div className="mt-10">
            <h3 className="text-blue-500 uppercase tracking-wider font-semibold mb-4">
              Our Solutions
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <p className="font-medium">01 Freight & Shipping</p>
                <button className="text-blue-600 text-xl">→</button>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <p className="font-medium">02 Warehousing</p>
                <button className="text-blue-600 text-xl">→</button>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <p className="font-medium">03 Real-Time Tracking</p>
                <button className="text-blue-600 text-xl">→</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Preview Section --- */}
      <section className="bg-white py-20 px-6 md:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            What We Offer
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our core logistics services designed to move your business
            efficiently — with speed, reliability, and full transparency.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${service.color}`}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/Services"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            View All Services →
          </Link>
        </div>
      </section>

      {/* Footer Accent */}
      <div className="h-4 bg-blue-600 w-full"></div>
    </div>
  );
};

export default AboutUs;
