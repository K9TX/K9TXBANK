import React from "react";

const Marketing = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Marketing Strategies Container */}
      <div className="max-w-4xl bg-black shadow-lg rounded-lg p-8 mt-20 border border-gray-700">
        {/* Heading Section */}
        <h1 className="text-4xl font-extrabold text-blue-500 mb-6 text-left">
          Marketing Strategies
        </h1>

        {/* Introduction to Marketing Strategies */}
        <p className="text-gray-400 text-lg leading-relaxed mb-4">
          Our marketing approach is designed to enhance brand visibility, drive
          customer engagement, and accelerate business growth. We leverage
          data-driven strategies and innovative outreach methods to establish a
          strong market presence.
        </p>

        {/* Key Marketing Strategies List */}
        <ul className="list-disc mt-4 ml-6 text-gray-400 space-y-3">
          <li className="flex items-start">
            <span className="mr-2">📢</span>
            <span>
              <strong>Social Media & Digital Campaigns:</strong> We create
              compelling content and targeted advertisements across platforms
              like X (Twitter), LinkedIn, Instagram, and YouTube to maximize
              brand awareness and engagement.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎯</span>
            <span>
              <strong>Target Audience & Analytics:</strong> Our strategies are
              backed by data and insights, helping us understand customer
              behavior, refine our approach, and optimize conversion rates.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🤝</span>
            <span>
              <strong>Partnerships & Collaborations:</strong> We build strategic
              alliances with fintech companies, influencers, and industry
              leaders to expand our reach and credibility in the market.
            </span>
          </li>
        </ul>

        {/* Call to Action */}
        <p className="text-gray-500 text-md mt-6">
          Interested in partnering with us? Visit our{" "}
         
            Marketing Page
          
          to explore collaboration opportunities.
        </p>
      </div>
    </div>
  );
};

export default Marketing;
