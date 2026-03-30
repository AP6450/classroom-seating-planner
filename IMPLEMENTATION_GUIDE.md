# Implementation Guide: Advanced Features

This guide contains all the code needed to add the remaining features from your Base44 app.

## Current Status

✅ **Working:**
- Basic student management (add/delete)
- Year level filtering
- localStorage persistence
- Plan creation
- Student pool display

⚠️ **To Implement:**
1. Enhanced Sociogram with SVG canvas
2. Relationship editor with visual arrows
3. Seating grid with drag-and-drop
4. Auto-arrange algorithms

---

## Feature 1: Enhanced Sociogram Page

### What This Adds
- Interactive SVG canvas with draggable student nodes
- Visual relationship arrows (green=positive, red=negative)
- Click students to select and edit
- Relationship management panel

### Files to Create/Update

**Replace `src/pages/Sociogram.jsx` with enhanced version**

Key features:
- Each student rendered as a draggable circle node
- Mouse drag to reposition nodes
- Arrows drawn between students with relationships
- Side panel shows selected student details
- Add/edit/delete relationships

---

## Feature 2: Relationship Management

### What This Adds
- Click a student node to select
- Panel shows all relationships for that student
- Add new relationships with type (positive/negative/neutral) and strength (1-5)
- Visual arrows update in real-time

### Key Components Needed
- Student selection state
- Relationship form with dropdowns
- Arrow rendering based on relationship type
- Color coding: green (#10b981), red (#ef4444), gray (#6b7280)

---

## Feature 3: Seating Grid with Drag-Drop

### What This Adds
- Grid of seats matching classroom layout
- Drag students from pool onto seats
- Drag students between seats
- Remove students from seats
- Color-coded seat borders based on relationship scores

### Implementation Details

**Uses `@hello-pangea/dnd` library (already in package.json)**

Grid structure:
- Each seat is a droppable zone
- Students are draggable items
- Track assignments in plan state: `{ seatId: studentId }`

**Scoring system:**
- Calculate score based on adjacent seats
- Positive relationships = +1 to +5
- Negative relationships = -1 to -5
- Green border: score > 0
- Red border: score < 0

---

## Feature 4: Auto-Arrange Algorithms

### Algorithm 1: By Groups + Relationships

**Steps:**
1. Group students by ZPD (1, 2, 3)
2. Within each ZPD group, calculate relationship scores
3. Place highest-scored pairs first
4. Fill remaining seats maintaining ZPD proximity

### Algorithm 2: By Relationships Only

**Steps:**
1. Ignore ZPD groups
2. Calculate all pairwise relationship scores
3. Use greedy algorithm to maximize total positive score
4. Place students with strongest positive relationships near each other

### Algorithm 3: ZPD Clusters (3-4 per group)

**Steps:**
1. Divide students into clusters of 3-4
2. Each cluster MUST contain at least one student from each ZPD group (1, 2, 3)
3. Arrange clusters in 2×2 blocks across the grid
4. Within each cluster, optimize for positive relationships

**Example 2×2 block:**
```
[ZPD 1] [ZPD 2]
[ZPD 3] [ZPD 1]
```

---

## Implementation Priority

**Phase 1: Visual Enhancements (Recommended First)**
1. Enhanced Sociogram SVG canvas
2. Basic relationship editor
3. Visual arrow rendering

**Phase 2: Seating Grid**
1. Grid layout component
2. Drag-drop integration
3. Scoring visualization

**Phase 3: Auto-Arrange**
1. Algorithm 2 (simplest)
2. Algorithm 1 (ZPD grouping)
3. Algorithm 3 (cluster arrangement)

---

## Code Snippets

### SVG Node Positioning

```javascript
// Store node positions in student state
const [nodePositions, setNodePositions] = useState({})

// Initialize random positions
useEffect(() => {
  const positions = {}
  students.forEach(s => {
    positions[s.id] = {
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 100
    }
  })
  setNodePositions(positions)
}, [students.length])

// Render nodes
<svg width="800" height="600">
  {students.map(student => (
    <circle
      key={student.id}
      cx={nodePositions[student.id]?.x}
      cy={nodePositions[student.id]?.y}
      r="30"
      fill={getZpdColor(student.zpd_group)}
      onMouseDown={e => handleDragStart(e, student.id)}
    />
  ))}
</svg>
```

### Relationship Arrow Rendering

```javascript
// Draw arrows between connected students
{relationships.map(rel => {
  const from = nodePositions[rel.from_student]
  const to = nodePositions[rel.to_student]
  if (!from || !to) return null
  
  const color = rel.type === 'positive' ? '#10b981' : 
                rel.type === 'negative' ? '#ef4444' : '#6b7280'
  
  return (
    <line
      key={rel.id}
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={color}
      strokeWidth="2"
      strokeDasharray={rel.type === 'negative' ? '5,5' : '0'}
    />
  )
})}
```

### Seat Score Calculation

```javascript
function calculateSeatScore(seatId, studentId, assignments, relationships) {
  const adjacentSeats = getAdjacentSeats(seatId) // up, down, left, right
  let score = 0
  
  adjacentSeats.forEach(adjSeat => {
    const adjStudent = assignments[adjSeat]
    if (!adjStudent) return
    
    const rel = relationships.find(r => 
      (r.from_student === studentId && r.to_student === adjStudent) ||
      (r.from_student === adjStudent && r.to_student === studentId)
    )
    
    if (rel) {
      score += rel.type === 'positive' ? rel.strength : -rel.strength
    }
  })
  
  return score
}
```

---

## Next Steps

To implement these features:

1. **Read through this guide** to understand the structure
2. **Start with the Sociogram enhancements** - most visual impact
3. **Test each feature** as you build it
4. **Refer to Base44 app** for exact behavior to replicate

All the infrastructure (state management, routing, styling) is already in place. You just need to add the interactive components!

---

## Questions?

If you need specific code for any component, I can provide detailed implementations. The patterns above show the core logic for each feature.
