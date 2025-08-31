# Revit Dependency Scanner

A comprehensive tool for analyzing and managing .NET assembly dependencies in Autodesk Revit installations. This project helps developers avoid dependency hell by providing detailed information about package versions, compatibility, and potential conflicts across different Revit versions.

<img width="1644" height="866" alt="image" src="https://github.com/user-attachments/assets/dc360046-0140-4225-8fdf-53e624447b9a" />


## Overview

The Revit Dependency Scanner consists of two main components:

1. **Frontend**: A modern Next.js web application for browsing and searching Revit dependencies
2. **Scanner**: A .NET tool for extracting assembly metadata from Revit installations

## Features

- **Multi-Version Support**: Analyze dependencies across Revit 2021-2026
- **Smart Search**: Fast search functionality with FlexSearch integration
- **Mobile-Responsive Design**: Collapsible navigation for optimal mobile experience
- **Interactive UI**: Modern interface with gradient accents and smooth animations
- **Detailed Assembly Information**: View complete assembly metadata including:
  - Assembly identity and versioning
  - Strong naming status
  - Referenced assemblies
  - NuGet package information
  - Binding redirect suggestions
- **Compatibility Analysis**: Identify potential version conflicts and compatibility issues
- **Robust Error Handling**: Graceful handling of missing or undefined assembly data

## Quick Start

### Frontend Application

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
revit-dependency-scanner/
├── frontend/                 # Next.js web application
│   ├── app/                 # App router pages
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main application page
│   ├── components/          # React components
│   │   ├── ContentDisplay.tsx    # Assembly details view
│   │   ├── NavigationTree.tsx    # Dependency tree navigation
│   │   └── SearchBar.tsx         # Search functionality
│   ├── lib/                 # Utility libraries
│   │   ├── data-loader.ts   # Assembly data loading
│   │   └── search.ts        # Search implementation
│   ├── public/              # Static assets and data files
│   │   ├── RevitAssemblyMetadata2021.json
│   │   ├── RevitAssemblyMetadata2022.json
│   │   ├── RevitAssemblyMetadata2023.json
│   │   └── RevitAssemblyMetadata2024.json
│   └── package.json         # Dependencies and scripts
└── scanner/                 # .NET assembly scanner (future)
    └── DS.Revit/           # Scanner project
```

## How It Works

### Data Loading
The application loads assembly metadata from JSON files in the `public/` directory. Each file contains detailed information about assemblies found in specific Revit versions, including:

- Assembly names and versions
- Public key tokens (strong naming)
- Referenced assemblies
- File locations
- Target framework information

### Search Functionality
- **Fast Search**: Powered by FlexSearch for instant results
- **Multi-field Search**: Search across assembly names, descriptions, and metadata
- **Version Filtering**: Results are automatically filtered by selected Revit version
- **Keyboard Navigation**: Full keyboard support with arrow keys and Enter
- **Error-Resilient**: Handles undefined properties and missing data gracefully
- **Mobile-Optimized**: Collapsible sidebar for better mobile search experience

### Assembly Analysis
The application provides detailed analysis for each assembly:

- **Identity Information**: Complete assembly identity including version and public key token
- **Strong Naming Status**: Whether the assembly is digitally signed
- **Compatibility**: Version ranges and binding redirect suggestions
- **Dependencies**: Referenced assemblies and their versions
- **Conflicts**: Known compatibility issues and solutions

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development with strict null checks
- **Tailwind CSS**: Utility-first CSS framework with gradient support
- **FlexSearch**: Fast, memory-efficient search with error handling
- **React 18**: Modern React with hooks and concurrent features
- **Responsive Design**: Mobile-first approach with collapsible navigation

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## Data Sources

The application currently includes assembly metadata for:
- **Revit 2021**: Legacy version with limited modern dependency support
- **Revit 2022**: Legacy version still used by many organizations
- **Revit 2023**: Widely adopted stable version
- **Revit 2024**: Current stable version with improved interoperability

*Note: Revit 2025 and 2026 data will be available in future updates*

## Configuration

### Environment Variables
No environment variables are required for basic operation. The application uses static JSON files for data.

### Customization
- **Data Files**: Replace JSON files in `public/` directory with your own assembly metadata
- **Styling**: Modify Tailwind configuration in `tailwind.config.js`
- **Search**: Adjust search parameters in `lib/search.ts`

## Scanner Component (Future Development)

The scanner component (`scanner/DS.Revit/`) is designed to:
- Scan Revit installations for .NET assemblies
- Extract detailed assembly metadata
- Generate JSON data files for the frontend
- Support automated dependency analysis

*This component is currently under development.*

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include your Revit version and operating system

## Roadmap

- [x] Mobile-responsive navigation with collapsible sidebar
- [x] Enhanced UI with gradient accents and visual improvements
- [x] Robust error handling for undefined assembly properties
- [ ] Complete scanner component development
- [ ] Add Revit 2025/2026 support
- [ ] Implement conflict detection algorithms
- [ ] Add export functionality for dependency reports
- [ ] Integration with NuGet API for latest version checking
- [ ] Support for custom assembly locations
- [ ] Dark mode theme support
- [ ] Advanced filtering and sorting options

---

## Legal Notice

This tool extracts only assembly metadata (names, versions, public key tokens) from Revit installations for interoperability purposes. No proprietary code or resources are extracted or redistributed. 

**Built with ❤️ for the Revit development community**
