// components/PersonalCallToAction.js
"use client";
import React from "react";

export default function PersonalCallToAction() {
  return (
    <section className="relative bg-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute left-0 top-0 w-48 h-48 bg-blue-100 rounded-full 
                   -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"
      />
      <div
        className="absolute right-0 bottom-0 w-48 h-48 bg-purple-100 rounded-full 
                   translate-x-1/2 translate-y-1/2 opacity-40 pointer-events-none"
      />

      <div className="relative mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 lg:gap-24 items-start">
          {/* ── Left column: avatar + name ── */}
          <div className="flex flex-col items-center lg:items-start">
            <img
              src="/images/avatar.png"
              alt="Saniya Sapkal"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
            <span className="mt-4 text-xl font-semibold text-gray-800">
        Saniya Sapkal
            </span>
          </div>

          {/* ── Right column: heading, copy, buttons ── */}
          <div>
            {/* Heading + underline accent */}
            <div className="inline-block relative mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Open to what’s next.
              </h2>
              <span
                className="absolute left-0 bottom-0 block h-1 w-16 
                           bg-gradient-to-r from-blue-500 to-purple-500 rounded"
              />
            </div>

            {/* Supporting copy */}
            <p
              className="text-lg text-gray-600 leading-relaxed mb-8 
                         max-w-[min(90vw,65ch)] mx-auto lg:mx-0"
            >
              Conversations can lead to ideas, opportunities, or something unexpected.
              <br />
              If something here sparked curiosity or connection, I’d be glad to hear from you.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 
                           bg-blue-600 text-white text-sm font-medium 
                           rounded-full shadow hover:bg-blue-700 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 2a2 2 0 00-2 2v12a2 2 0 002 2h4a2 2 0 002-2V7.414A2 2 0 0012.414 6L10 3.586A2 2 0 008 2z" />
                </svg>
                View Resume
              </a>
              <a
                href="https://www.linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 
                           border-2 border-blue-500 text-blue-500 text-sm 
                           font-medium rounded-full shadow-sm hover:bg-blue-50 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0…" />
                </svg>
                LinkedIn
              </a>
              <a
                href="mailto:your.email@example.com"
                className="flex items-center gap-2 px-6 py-3 
                           border-2 border-red-500 text-red-500 text-sm 
                           font-medium rounded-full shadow-sm hover:bg-red-50 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.94 6.44l7 4.2a1 1 0 …" />
                  <path d="M18 8.14l-7 4.2a3 3 0 …" />
                </svg>
                Email Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
