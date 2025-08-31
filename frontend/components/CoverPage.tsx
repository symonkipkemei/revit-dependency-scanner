'use client'

import { useState } from 'react'

interface CoverPageProps {
  onEnterApp: () => void
}

export default function CoverPage({ onEnterApp }: CoverPageProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center" style={{ fontFamily: 'Quan Light, sans-serif' }}>
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl text-black mb-6 leading-tight" style={{ fontFamily: 'Quan Bold, sans-serif' }}>
            Revit Dependency
            <span className="text-black block">Scanner</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Find compatible package versions across Revit installations. 
            <span className="text-black font-medium"> Avoid dependency hell.</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span>Revit 2021-2024</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <span>Real Assembly Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
              <span>Compatibility Analysis</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <button
            onClick={onEnterApp}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              group relative px-12 py-4 bg-black text-white rounded-full text-lg font-semibold
              transform transition-all duration-300 ease-out
              hover:bg-gray-800 hover:scale-105 hover:shadow-xl
              focus:outline-none focus:ring-4 focus:ring-gray-200
              ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
            `}
            style={{ fontFamily: 'Quan Bold, sans-serif' }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Scanning
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>


      </div>
    </div>
  )
}
