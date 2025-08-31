/**
 * Utility function to get the correct asset path for both development and production
 * In production (GitHub Pages), assets need the base path prefix
 */
export function getAssetPath(path: string): string {
  return `/revit-dependency-scanner${path}`
}
