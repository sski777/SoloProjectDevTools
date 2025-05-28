import React from "react";
import { Link } from "react-router-dom";

const tools = [
  { name: "JSON Formatter", path: "/json" },
  { name: "Regex Tester", path: "/regex" },
  { name: "Base64 Encoder/Decoder", path: "/base64" },
  { name: "JWT Decoder", path: "/jwt" },
  { name: "UUID Generator", path: "/uuid" },
  { name: "Unix Timestamp Converter", path: "/timestamp" },
  { name: "Color Converter", path: "/color" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">🛠️ Developer Toolkit</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        A collection of handy tools for developers — format JSON, test regex, decode JWTs, and more.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {tools.map((tool, index) => (
          <Link
            key={index}
            to={tool.path}
            className="bg-white border border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-md rounded-xl p-4 text-center transition-colors"
          >
            <span className="text-lg font-medium text-gray-700">{tool.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;