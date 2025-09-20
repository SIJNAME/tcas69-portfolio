import { create } from 'zustand'

export type Student = {
  id: string
  firstName: string
  lastName: string
  address: string
  phone: string
  school: string
  gpa: number
  talent: string
  reason: string
  major: string
  university: string
  image: FileList | null
}

type StudentState = {
  students: Student[]
  addStudent: (s: Student) => void
  getStudentById: (id: string) => Student | undefined
  deleteStudent: (id: string) => void // 👈 1. เพิ่มบรรทัดนี้ใน Type
}

export const useStudentStore = create<StudentState>((set, get) => ({
  students: [],
  addStudent: (s: Student) => set(state => ({ students: [...state.students, s] })),
  getStudentById: (id: string) => get().students.find(x => x.id === id),
  
  // 👇 2. เพิ่มฟังก์ชันนี้เข้าไป
  deleteStudent: (id: string) => set(state => ({
    students: state.students.filter(student => student.id !== id)
  }))
}))