'use client'

import { useState } from 'react'

interface CoverPageProps {
  onEnterApp: () => void
}

export default function CoverPage({ onEnterApp }: CoverPageProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center" style={{ fontFamily: 'Quan Light, sans-serif' }}>
        {/* Hero Section */}
        <div className="flex items-start gap-8">
          <div className="flex-shrink-0 h-full flex items-stretch">
            <img 
              src="/icons/ICON-Black.png" 
              alt="Revit Dependency Scanner" 
              className="w-72 h-auto md:w-96 object-contain animate-spin"
              style={{ animationDuration: '10s' }}
            />
          </div>
          <div className="flex-1 text-left">
            <h1 className="text-6xl md:text-7xl text-black leading-tight mb-6" style={{ fontFamily: 'Quan Bold, sans-serif' }}>
              Revit Dependency Scanner
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-4 leading-relaxed">
              Find compatible package versions<br />
              across Revit versions.
            </p>
            <p className="text-2xl md:text-3xl text-black font-medium mb-8">
              Avoid dependency hell.
            </p>
            
            <div className="flex flex-wrap gap-6 text-lg text-gray-700 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <span>Revit 2021-2024</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <span>Real Assembly Data</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                <span>Compatibility Analysis</span>
              </div>
            </div>

            <button
              onClick={onEnterApp}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="
                group relative px-6 py-2 bg-black text-white rounded-lg text-lg font-semibold
                transform transition-all duration-300 ease-out
                hover:bg-gray-800 hover:scale-105 hover:shadow-xl
                focus:outline-none focus:ring-4 focus:ring-gray-200
                shadow-lg
              "
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
    </div>
  )
}
