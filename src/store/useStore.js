import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

// Students hook
export function useStudents() {
  const [students, setStudents] = useState(() => loadFromStorage('csp_students', []))

  useEffect(() => { saveToStorage('csp_students', students) }, [students])

  const createStudent = useCallback((data) => {
    const student = { id: uuidv4(), ...data, created_date: new Date().toISOString() }
    setStudents(prev => [...prev, student])
    return student
  }, [])

  const updateStudent = useCallback((id, data) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s))
  }, [])

  const deleteStudent = useCallback((id) => {
    setStudents(prev => prev.filter(s => s.id !== id))
  }, [])

  return { students, createStudent, updateStudent, deleteStudent }
}

// Relationships hook
export function useRelationships() {
  const [relationships, setRelationships] = useState(() => loadFromStorage('csp_relationships', []))

  useEffect(() => { saveToStorage('csp_relationships', relationships) }, [relationships])

  const createRelationship = useCallback((data) => {
    const rel = { id: uuidv4(), ...data, created_date: new Date().toISOString() }
    setRelationships(prev => [...prev, rel])
    return rel
  }, [])

  const updateRelationship = useCallback((id, data) => {
    setRelationships(prev => prev.map(r => r.id === id ? { ...r, ...data } : r))
  }, [])

  const deleteRelationship = useCallback((id) => {
    setRelationships(prev => prev.filter(r => r.id !== id))
  }, [])

  const deleteByStudent = useCallback((studentId) => {
    setRelationships(prev => prev.filter(r => r.from_student !== studentId && r.to_student !== studentId))
  }, [])

  return { relationships, createRelationship, updateRelationship, deleteRelationship, deleteByStudent }
}

// Seating Plans hook
export function useSeatingPlans() {
  const [plans, setPlans] = useState(() => loadFromStorage('csp_plans', []))

  useEffect(() => { saveToStorage('csp_plans', plans) }, [plans])

  const createPlan = useCallback((data) => {
    const plan = { id: uuidv4(), ...data, created_date: new Date().toISOString() }
    setPlans(prev => [...prev, plan])
    return plan
  }, [])

  const updatePlan = useCallback((id, data) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  }, [])

  const deletePlan = useCallback((id) => {
    setPlans(prev => prev.filter(p => p.id !== id))
  }, [])

  return { plans, createPlan, updatePlan, deletePlan }
}
