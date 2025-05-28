"use client";

import React from "react";

export default function FourFramesSection({ frames }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Four Frames Leadership Reflection
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {frames.map((f) => (
            <div
              key={f.id}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h4 className="font-semibold mb-2">{f.title} (Score: {f.score})</h4>
              <p className="text-gray-600 text-sm">{f.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
