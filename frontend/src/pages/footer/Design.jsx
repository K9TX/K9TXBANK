import React from "react";

const Design = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Design Principles Container */}
      <div className="max-w-4xl bg-black shadow-lg rounded-lg p-8 mt-20 border border-gray-700">
        {/* Heading Section */}
        <h1 className="text-4xl font-extrabold text-blue-500 mb-6 text-left">
          Design Principles
        </h1>

        {/* Introduction to Design Principles */}
        <p className="text-gray-400 text-lg leading-relaxed mb-4">
          Our design approach is centered around modern aesthetics,
          user-friendliness, and accessibility. We ensure a seamless and
          intuitive banking experience by adhering to key design principles that
          enhance usability and engagement.
        </p>

        {/* Key Design Principles */}
        <ul className="list-disc mt-4 ml-6 text-gray-400 space-y-3">
          <li className="flex items-start">
            <span className="mr-2">📱</span>
            <span>
              <strong>Responsive & Mobile-Friendly UI:</strong> Our platform is
              optimized for all screen sizes, ensuring a seamless experience on
              desktops, tablets, and smartphones.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎨</span>
            <span>
              <strong>Consistent Visual Hierarchy:</strong> We maintain a clear
              and structured layout with a well-defined color scheme,
              typography, and spacing to improve readability and navigation.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🛠️</span>
            <span>
              <strong>Accessibility & Usability Standards:</strong> Our design
              follows WCAG (Web Content Accessibility Guidelines) to ensure
              inclusivity for users with disabilities, offering keyboard
              navigation, contrast-friendly colors, and screen reader support.
            </span>
          </li>
        </ul>

        {/* Additional Information */}
        <p className="text-gray-500 text-md mt-6">
          By prioritizing these principles, we create an intuitive and secure
          banking environment that meets the needs of all users.
        </p>
      </div>
    </div>
  );
};

export default Design;
