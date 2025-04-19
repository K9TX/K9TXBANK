import React from "react";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Careers Section Container */}
      <div className="max-w-4xl bg-black shadow-lg rounded-lg p-8 mt-20 border border-gray-700">
        {/* Heading Section */}
        <h1 className="text-4xl font-extrabold text-blue-500 mb-6 text-left">
          Careers at K9TX-Bank
        </h1>

        {/* Introduction to Careers */}
        <p className="text-gray-400 text-lg leading-relaxed mb-4">
          At K9TX-Bank, we are shaping the future of digital banking. We seek
          passionate individuals who thrive in an innovative, collaborative, and
          growth-driven environment. Whether you're an experienced professional
          or just starting your career, we offer opportunities to help you
          excel.
        </p>

        {/* Career Opportunities List */}
        <ul className="list-disc mt-4 ml-6 text-gray-400 space-y-3">
          <li className="flex items-start">
            <span className="mr-2">💼</span>
            <span>
              <strong>Open Positions & Job Roles:</strong> Explore a range of
              full-time roles across engineering, finance, product management,
              customer service, and more.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🎓</span>
            <span>
              <strong>Internship & Training Programs:</strong> Gain hands-on
              experience and mentorship in fintech, software development, and
              banking operations through our structured programs.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📌</span>
            <span>
              <strong>Remote & Hybrid Work Opportunities:</strong> We embrace
              flexible work models, allowing employees to work remotely or in a
              hybrid setup for improved work-life balance.
            </span>
          </li>
        </ul>

        {/* Call to Action */}
        <p className="text-gray-500 text-md mt-6">
          Ready to build the future with us? Visit our{" "}
          
            Careers Page
          
          to explore opportunities and apply today.
        </p>
      </div>
    </div>
  );
};

export default Jobs;
