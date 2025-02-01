import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 sm:px-8">
        <div className="absolute inset-0 w-full h-full">
          <img src="/Background3.jpg" alt="Hero Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-3xl px-4 sm:px-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Revolutionizing Online Coding with AI Assistance & Real-time Collaboration
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Code seamlessly with AI-powered assistance and work with your friends in real-time. Experience a new level of efficiency and innovation.
          </p>
          <button onClick={() => loginWithRedirect()} className="mt-6 px-6 py-3 text-base sm:text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold">Features</h2>
        <p className="mt-4 text-gray-600">Explore the powerful features of our AI-assisted code editor.</p>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 text-center">
        <h2 className="text-3xl font-bold">Pricing</h2>
        <p className="mt-4 text-gray-600">Choose a plan that suits your needs.</p>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="mt-4 text-gray-600">Reach out to us for any queries or support.</p>
      </section>
    </div>
  );
};

export default LandingPage;
