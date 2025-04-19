import React, { useState } from 'react';
import K9TXSpinner, { InlineK9TXSpinner } from './Loading';
import { motion } from 'framer-motion';

const SpinnerDemo = () => {
  const [showFullScreenSpinner, setShowFullScreenSpinner] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-6 flex flex-col items-center justify-center">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-16 text-center"
      >
        K9TX Bank Loading Spinners
      </motion.h1>
      
      {/* Inline spinner sizes */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12 w-full max-w-2xl"
      >
        <h2 className="text-xl font-semibold text-white mb-8 text-center">Inline Spinners</h2>
        
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-2">
            <InlineK9TXSpinner size="sm" text="Small" />
            <p className="text-gray-400 text-sm">Small</p>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <InlineK9TXSpinner size="md" text="Medium" />
            <p className="text-gray-400 text-sm">Medium</p>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <InlineK9TXSpinner size="lg" text="Large" />
            <p className="text-gray-400 text-sm">Large</p>
          </div>
        </div>
      </motion.div>
      
      {/* Full screen spinner demo */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 w-full max-w-2xl text-center"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Full Screen Spinner</h2>
        <p className="text-gray-300 mb-8">
          Click the button below to show the full-screen loading spinner overlay
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFullScreenSpinner(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg"
        >
          Show Full Screen Spinner
        </motion.button>
      </motion.div>
      
      {/* Full screen spinner (shown conditionally) */}
      {showFullScreenSpinner && (
        <>
          <K9TXSpinner />
          {/* Auto-hide after 3 seconds for demo purposes */}
          {setTimeout(() => setShowFullScreenSpinner(false), 3000)}
        </>
      )}
    </div>
  );
};

export default SpinnerDemo; 