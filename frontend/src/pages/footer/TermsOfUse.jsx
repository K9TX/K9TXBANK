import React from "react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Terms of Use Container */}
      <div className="max-w-4xl bg-black shadow-lg rounded-lg p-8 mt-20 border border-gray-700">
        {/* Heading Section */}
        <h1 className="text-4xl font-extrabold text-blue-500 mb-6 text-left">
          Terms of Use
        </h1>

        {/* Introduction to Terms of Use */}
        <p className="text-gray-400 text-lg leading-relaxed mb-4">
          By accessing and using our services, you agree to comply with our
          terms and conditions. Please review them carefully to ensure a clear
          understanding of your rights and obligations.
        </p>

        {/* Terms of Use Details */}
        <ul className="list-disc mt-4 ml-6 text-gray-400 space-y-3">
          <li className="flex items-start">
            <span className="mr-2">🔹</span>
            <span>
              <strong>Account Registration & Security:</strong> Users must
              provide accurate information during registration and ensure the
              security of their accounts. Unauthorized access or misuse of
              accounts is strictly prohibited.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔹</span>
            <span>
              <strong>Service Usage Guidelines:</strong> Our services must be
              used ethically and legally. Any fraudulent, abusive, or malicious
              activity will result in account suspension or legal action.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔹</span>
            <span>
              <strong>Legal Disclaimers & Liability:</strong> We provide our
              services on an "as-is" basis without guarantees of uninterrupted
              access. Our liability is limited as outlined in our full terms of
              service.
            </span>
          </li>
        </ul>

        {/* Call to Action */}
        <p className="text-gray-500 text-md mt-6">
          For more details, please visit our{" "}
          
            Full Terms of Service
          
          or contact our support team.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
