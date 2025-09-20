'use client'

import { useStudentStore } from '@/store/studentStore'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react' // 👈 1. Import useState และ useEffect

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { getStudentById, deleteStudent } = useStudentStore()
  const student = getStudentById(id)

  // --- ส่วนจัดการรูปภาพ ---
  // 2. สร้าง State เพื่อเก็บ URL ของรูปภาพ
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  // 3. ใช้ useEffect เพื่อสร้าง URL เมื่อ component โหลดเสร็จ
  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูล student, มีไฟล์, และไฟล์นั้นเป็นประเภทรูปภาพหรือไม่
    if (student?.image && student.image[0] && student.image[0].type.startsWith('image/')) {
      const file = student.image[0]
      const url = URL.createObjectURL(file) // สร้าง URL จากไฟล์
      setImageUrl(url)

      // 4. Cleanup function: จะทำงานเมื่อ component ถูกปิด เพื่อคืนหน่วยความจำ (สำคัญมาก!)
      return () => {
        URL.revokeObjectURL(url)
      }
    }
  }, [student]) // ให้ useEffect ทำงานใหม่ทุกครั้งที่ข้อมูล student เปลี่ยน

  // --- (โค้ดส่วนอื่นเหมือนเดิม) ---
  const handleDelete = () => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลของ ${student?.firstName}?`)) {
      deleteStudent(id)
      alert('ลบข้อมูลสำเร็จ')
      router.push('/admin')
    }
  }

  if (!student) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">ไม่พบข้อมูลนักศึกษา</h1>
        <Link href="/admin" className="text-blue-600 underline mt-4 inline-block">
          กลับไปที่หน้ารายชื่อ
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl mx-auto mt-8">
      {/* --- ส่วนแสดงผลรูปภาพ --- */}
      {/* 5. ถ้ามี imageUrl ให้แสดงแท็ก <img> */}
      <h1 className="text-3xl font-bold text-blue-900 mb-6 border-b pb-4 text-center">
        Portfolio - {student.firstName} {student.lastName}
      </h1>
      
      {imageUrl && (
        <div className="mb-6 flex justify-center">
          <img
            src={imageUrl}
            alt={`Portfolio of ${student.firstName}`}
            className="rounded-lg shadow-md max-w-xs max-h-96 object-contain"
          />
        </div>
      )}
      
      

      <div className="space-y-4">
        {/* ... (DetailRow components เหมือนเดิม) ... */}
        <DetailRow label="ชื่อ-สกุล" value={`${student.firstName} ${student.lastName}`} />
        <DetailRow label="สถานศึกษา" value={student.school} />
        <DetailRow label="คณะที่เลือก" value={student.major} />
        <DetailRow label="GPA" value={student.gpa.toString()} />
        
        {/* ถ้าไฟล์ที่อัปโหลดไม่ใช่รูปภาพ จะยังคงแสดงชื่อไฟล์เหมือนเดิม */}
        {student.image && student.image[0] && !student.image[0].type.startsWith('image/') && (
          <DetailRow label="ไฟล์แนบ" value={student.image[0].name} />
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <Link href="/admin" className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
          กลับ
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          ลบข้อมูล
        </button>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  // ... (โค้ด DetailRow เหมือนเดิม)
  return (
    <div className="grid grid-cols-3 gap-4 items-center">
      <strong className="text-gray-600 text-right col-span-1">{label}:</strong>
      <p className="text-gray-800 col-span-2 break-words">{value || '-'}</p>
    </div>
  )
}