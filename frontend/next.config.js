/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/revit-dependency-scanner',
  assetPrefix: '/revit-dependency-scanner/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
