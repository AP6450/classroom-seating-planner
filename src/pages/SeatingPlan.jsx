import { useState } from 'react'
import { useStudents, useSeatingPlans } from '../store/useStore'
import { Plus, Grid3x3 } from 'lucide-react'

export default function SeatingPlan() {
  const { students } = useStudents()
  const { plans, createPlan } = useSeatingPlans()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [yearFilter, setYearFilter] = useState('all')

  const filteredStudents = yearFilter === 'all'
    ? students
    : students.filter(s => String(s.year_level) === yearFilter)

  const handleCreatePlan = () => {
    const name = prompt('Plan name:')
    if (name) {
      const plan = createPlan({
        name,
        rows: 5,
        cols: 6,
        assignments: {}
      })
      setSelectedPlan(plan.id)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Seating Plans</h1>
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
            onClick={handleCreatePlan}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={16} /> New Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-3">Plans</h2>
          {plans.length === 0 ? (
            <p className="text-sm text-gray-500">No plans yet</p>
          ) : (
            <div className="space-y-2">
              {plans.map(plan => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    selectedPlan === plan.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {plan.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
          {selectedPlan ? (
            <div>
              <h2 className="font-semibold text-lg mb-4">
                {plans.find(p => p.id === selectedPlan)?.name}
              </h2>
              <div className="text-center text-gray-500 py-12">
                <Grid3x3 className="mx-auto mb-3" size={48} />
                <p>Seating grid interface coming soon</p>
                <p className="text-sm mt-2">Drag-and-drop will be implemented here</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>Select or create a plan to get started</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-3">Available Students ({filteredStudents.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {filteredStudents.map(student => (
            <div
              key={student.id}
              className="border rounded px-3 py-2 text-sm text-center"
            >
              <div className="font-medium">{student.initials || student.name.slice(0,3)}</div>
              <div className="text-xs text-gray-500">ZPD {student.zpd_group}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
