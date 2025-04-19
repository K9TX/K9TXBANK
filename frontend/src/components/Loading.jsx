import React from 'react';
import { motion } from 'framer-motion';

const K9TXSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative flex flex-col items-center">
        {/* Animated bank logo spinner */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer glow */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main spinner */}
          <div className="relative h-24 w-24 flex items-center justify-center">
            {/* Circular track */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-700/50"></div>
            
            {/* Spinning gradient arc */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            ></motion.div>
            
            {/* Bank logo */}
            <motion.div
              className="relative bg-black h-16 w-16 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex flex-col items-center">
                <span className="text-lg">K9TX</span>
                <span className="text-xs font-light">BANK</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Loading text */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-gray-300 font-medium text-xl mb-1">Loading</div>
          <motion.div 
            className="flex justify-center space-x-1"
            animate={{ y: ["0%", "-30%", "0%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              delay: 0.1
            }}
          >
            {[0, 1, 2].map((dot, i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-blue-500"
                animate={{ 
                  y: ["0%", "-100%", "0%"],
                  backgroundColor: ["#3b82f6", "#8b5cf6", "#3b82f6"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        </motion.div>
        
        {/* Optional status message */}
        <motion.p
          className="mt-3 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Securing your connection...
        </motion.p>
      </div>
    </div>
  );
};

// Alternate version that can be used inline (not full screen)
export const InlineK9TXSpinner = ({ size = "md", text = "" }) => {
  // Size classes mapping
  const sizeClasses = {
    sm: { container: "h-10 w-10", logo: "h-6 w-6", text: "text-xs" },
    md: { container: "h-16 w-16", logo: "h-10 w-10", text: "text-sm" },
    lg: { container: "h-24 w-24", logo: "h-16 w-16", text: "text-base" }
  };
  
  const { container, logo, textSize } = sizeClasses[size] || sizeClasses.md;
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-blue-500/20 blur-lg"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main spinner */}
        <div className={`relative ${container} flex items-center justify-center`}>
          {/* Circular track */}
          <div className="absolute inset-0 rounded-full border-2 border-gray-700/50"></div>
          
          {/* Spinning gradient arc */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-purple-500"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          ></motion.div>
          
          {/* Bank logo */}
          <div className={`relative bg-black ${logo} rounded-full flex items-center justify-center`}>
            <div className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex flex-col items-center text-[9px] leading-tight">
              <span>K9TX</span>
              <span className="font-light text-[6px]">BANK</span>
            </div>
          </div>
        </div>
      </div>
      
      {text && (
        <motion.p
          className={`mt-2 text-gray-300 ${textSize}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Default export is the full-screen version
export default K9TXSpinner;