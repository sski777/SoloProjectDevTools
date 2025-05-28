import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-gray-600 text-lg mb-4">
          Welcome to the Developer Toolkit — your all-in-one destination for essential web development tools. Whether you're debugging a complex JSON structure, testing regular expressions, or converting color formats, we've built tools to make your workflow faster and easier.
        </p>
        <p className="text-gray-600 text-lg mb-4">
          This toolkit is created with simplicity and speed in mind, using React and modern JavaScript to deliver a seamless experience. No external APIs, no clutter — just useful tools you can rely on.
        </p>
        <p className="text-gray-600 text-lg">
          Built by developers, for developers. We hope it saves you time and energy in your daily work.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
