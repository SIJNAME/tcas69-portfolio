'use client'
import { useStudentStore } from '@/store/studentStore'
import Link from 'next/link'
import { useState } from 'react'

export default function AdminPage() {
  const students = useStudentStore(s => s.students)
  const [sortAsc, setSortAsc] = useState(true)

  const sorted = [...students].sort((a, b) => sortAsc ? a.gpa - b.gpa : b.gpa - a.gpa)

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">รายชื่อนักศึกษา</h1>

      <button onClick={() => setSortAsc(!sortAsc)} className="mb-2 bg-gray-200 px-2 py-1 rounded">
        เรียงตาม GPA {sortAsc ? '↑' : '↓'}
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ชื่อ-นามสกุล</th>
            <th className="border px-4 py-2">GPA</th>
            <th className="border px-4 py-2">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(s => (
            <tr key={s.id}>
              <td className="border px-4 py-2">{s.firstName} {s.lastName}</td>
              <td className="border px-4 py-2">{s.gpa}</td>
              <td className="border px-4 py-2">
                <Link href={`/student/${s.id}`} className="text-blue-600 underline">ดูรายละเอียด</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
