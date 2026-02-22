import React from "react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-5xl font-bold text-center">
        Welcome to Quantum Trade AI
      </h1>
      <p className="mt-4 text-lg text-center max-w-xl">
        Your AI-powered market prediction dashboard. Analyze, predict, and act with confidence.
      </p>
      <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white text-lg">
        Enter Dashboard
      </button>
    </section>
  );
}
