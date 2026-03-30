import { useState } from 'react'
import { useStudents, useRelationships } from '../store/useStore'
import { Plus } from 'lucide-react'

export default function Sociogram() {
  const { students, createStudent, deleteStudent } = useStudents()
  const { relationships } = useRelationships()
  const [yearFilter, setYearFilter] = useState('all')

  const filteredStudents = yearFilter === 'all' 
    ? students 
    : students.filter(s => String(s.year_level) === yearFilter)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sociogram</h1>
        <div className="flex gap-3">
          <select 
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Years</option>
            {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(y => (
              <option key={y} value={y}>Year {y}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const name = prompt('Student name:')
              if (name) {
                createStudent({ 
                  name, 
                  initials: name.slice(0,3).toUpperCase(),
                  year_level: 8,
                  zpd_group: 1,
                  notes: ''
                })
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={16} /> Add Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map(student => (
            <div 
              key={student.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-sm text-gray-600">Year {student.year_level} - ZPD {student.zpd_group}</p>
                  {student.notes && <p className="text-sm mt-2 text-gray-500">{student.notes}</p>}
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Delete ${student.name}?`)) {
                      deleteStudent(student.id)
                    }
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
              <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                {relationships.filter(r => 
                  r.from_student === student.id || r.to_student === student.id
                ).length} relationships
              </div>
            </div>
          ))}
        </div>
        {filteredStudents.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No students yet. Click "Add Student" to get started.
          </p>
        )}
      </div>
    </div>
  )
}
