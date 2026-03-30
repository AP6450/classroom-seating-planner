# Classroom Seating Planner

A React application for creating classroom seating plans based on student sociograms and Zone of Proximal Development (ZPD) groupings.

## Features

### Sociogram Management
- **Student Management**: Add, edit, and delete students with:
  - Name and initials (up to 3 characters)
  - Year Level (0-12)
  - ZPD Group (1, 2, or 3)
  - Notes
- **Relationship Mapping**: Define relationships between students:
  - Types: Positive, Negative, Neutral
  - Strength levels
  - Visual arrows with color coding (green=positive, red=negative, grey=neutral)
- **Interactive Visualization**: Drag-and-drop student nodes on an SVG canvas
- **Year Level Filtering**: View only students from specific year levels

### Seating Plan Generation
- **Multiple Plans**: Create and manage multiple seating arrangements
- **Custom Grid Sizes**: Define classroom layout dimensions
- **Drag-and-Drop Interface**: Assign students to seats intuitively
- **Auto-Arrange Algorithms**:
  1. **By Groups + Relationships**: Groups students by ZPD first, then optimizes for positive relationships
  2. **By Relationships Only**: Pure relationship optimization without ZPD consideration
  3. **ZPD Clusters**: Creates mixed-ability groups of 3-4 students in 2×2 blocks
- **Visual Feedback**: Color-coded seat indicators (green=harmony, red=conflict)
- **Year Level Filtering**: Only assign students from selected year level

### Data Persistence
- All data stored in browser localStorage
- No backend required
- Data persists across sessions

## Tech Stack

- **React 18** with React Router
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **@hello-pangea/dnd** for drag-and-drop
- **lucide-react** for icons

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/AP6450/classroom-seating-planner.git
cd classroom-seating-planner

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
classroom-seating-planner/
├── src/
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components (Sociogram, SeatingPlan)
│   ├── store/           # State management (localStorage hooks)
│   ├── App.jsx          # Main app with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Development Status

✅ Core infrastructure complete
✅ State management with localStorage
✅ Build configuration
⚠️ Component implementation in progress

The project has been migrated from Base44 to a standalone React application. Component files need to be completed based on the Base44 implementation.

## License

MIT

## Author

AP6450
