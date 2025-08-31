/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/revit-dependency-scanner' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/revit-dependency-scanner' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
