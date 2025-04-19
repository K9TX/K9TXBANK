import React from "react";

const Branding = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Branding Guidelines Container */}
      <div className="max-w-4xl bg-black shadow-lg rounded-lg p-8 mt-20 border border-gray-700">
        {/* Heading Section */}
        <h1 className="text-4xl font-extrabold text-blue-500 mb-6 text-left">
          Branding Guidelines
        </h1>

        {/* Introduction to Branding */}
        <p className="text-gray-400 text-lg leading-relaxed mb-4">
          Our brand embodies trust, security, and innovation. Maintaining a
          consistent and professional visual identity across all platforms is
          crucial in reinforcing our brand's credibility and recognition. These
          guidelines serve as a reference to ensure uniformity in brand
          representation.
        </p>

        {/* Branding Elements List */}
        <ul className="list-disc mt-4 ml-6 text-gray-400 space-y-3">
          <li className="flex items-start">
            <span className="mr-2">🎨</span>
            <span>
              <strong>Brand Colors & Typography:</strong> Defines the color
              palette, font styles, and typography hierarchy for a cohesive
              design language.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📜</span>
            <span>
              <strong>Logo Usage & Variations:</strong> Guidelines for correct
              logo placement, sizing, color variations, and restrictions to
              maintain visual integrity.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🖼️</span>
            <span>
              <strong>Iconography & Imagery:</strong> Best practices for using
              icons and images to align with brand aesthetics and messaging.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📣</span>
            <span>
              <strong>Brand Voice & Communication Style:</strong> Defines the
              tone, language, and messaging style to ensure clear and
              professional communication.
            </span>
          </li>
        </ul>

        {/* Call to Action or Additional Information */}
        <p className="text-gray-500 text-md mt-6">
          For a detailed brand guide, refer to our official documentation or
          reach out to the branding team.
        </p>
      </div>
    </div>
  );
};

export default Branding;
