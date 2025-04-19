import React from "react";

const PressKit = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Press Kit Container */}
      <div className="max-w-4xl bg-black shadow-lg rounded-lg p-8 mt-20 border border-gray-700">
        {/* Heading Section */}
        <h1 className="text-4xl font-extrabold text-blue-500 mb-6 text-left">
          Press Kit
        </h1>

        {/* Introduction to Press Kit */}
        <p className="text-gray-400 text-lg leading-relaxed mb-4">
          Access our official media assets, company information, and latest
          press releases. Our press kit provides everything needed for
          journalists, media outlets, and partners to accurately represent our
          brand.
        </p>

        {/* Press Kit Contents */}
        <ul className="list-disc mt-4 ml-6 text-gray-400 space-y-3">
          <li className="flex items-start">
            <span className="mr-2">📄</span>
            <span>
              <strong>Company Overview & Factsheet:</strong> Key details about
              our mission, values, milestones, and leadership team.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📷</span>
            <span>
              <strong>Logos, Banners & Brand Assets:</strong> High-resolution
              logos, marketing banners, and official brand guidelines for media
              use.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📰</span>
            <span>
              <strong>Recent News & Press Releases:</strong> Stay updated with
              our latest announcements, media coverage, and industry insights.
            </span>
          </li>
        </ul>

        {/* Call to Action */}
        <p className="text-gray-500 text-md mt-6">
          For media inquiries, partnerships, or additional information, please
          visit our{" "}
          
            Press Page
          
          or contact our media team.
        </p>
      </div>
    </div>
  );
};

export default PressKit;
