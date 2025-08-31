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

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Smart Search</h3>
            <p className="text-gray-700 leading-relaxed">
              Fast search across assembly names, versions, and metadata with instant results
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Version Analysis</h3>
            <p className="text-gray-700 leading-relaxed">
              Detailed compatibility analysis and binding redirect suggestions
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black mb-4" style={{ fontFamily: 'Quan Bold, sans-serif' }}>Multi-Version</h3>
            <p className="text-gray-700 leading-relaxed">
              Support for Revit 2021-2024 with real assembly metadata
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
