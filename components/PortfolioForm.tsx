"use client";

import { useState } from "react";
// 1. Import store, action และ type ที่จำเป็น
import { useStudentStore, type Student } from "@/store/studentStore";

export function PortfolioForm() {
  // 2. ดึง action `addStudent` มาเตรียมใช้งาน
  const addStudent = useStudentStore((state) => state.addStudent);

  // 3. สร้าง state ก้อนเดียวเพื่อจัดการข้อมูลในฟอร์มทั้งหมด
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    school: "",
    address: "", // ใช้ 'address' แทน 'จังหวัด' เพื่อให้ตรงกับ Student type
    gpa: 0,
    major: "",
    // --- เพิ่ม field ที่เหลือให้ครบ ---
    phone: "",
    talent: "",
    reason: "",
    university: "",
  });

  // State สำหรับเก็บไฟล์ที่อัปโหลด (ใช้ FileList ให้ตรงกับ Type)
  const [image, setImage] = useState<FileList | null>(null);

  // 4. ฟังก์ชันเดียวสำหรับจัดการการเปลี่ยนแปลงของ input ทั้งหมด
  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gpa" ? parseFloat(value) : value,
    }));
  };

  // 5. ฟังก์ชันที่จะทำงานเมื่อกดปุ่ม Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันหน้าเว็บรีโหลด

    // สร้าง object นักเรียนใหม่ให้มีโครงสร้างตรงตาม `Student` type
    const newStudent: Student = {
      ...formData,
      id: Date.now().toString(), // สร้าง ID ชั่วคราว
      image: image,
    };

    // เรียก action เพื่อเพิ่มนักเรียนใหม่เข้าไปใน store
    addStudent(newStudent);

    alert("บันทึกข้อมูล Portfolio สำเร็จ!");
    // คุณอาจจะต้องการเคลียร์ฟอร์มหรือ redirect ผู้ใช้ไปหน้าอื่นตรงนี้
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">
        แบบฟอร์ม Portfolio TCAS69
      </h2>

      {/* 6. เชื่อมฟังก์ชัน handleSubmit เข้ากับ form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 7. เพิ่ม name, value, onChange ในทุก input */}
          <input type="text" name="firstName" placeholder="ชื่อ" value={formData.firstName} onChange={handleChange} className="input-field" required />
          <input type="text" name="lastName" placeholder="สกุล" value={formData.lastName} onChange={handleChange} className="input-field" required />
          <input type="text" name="school" placeholder="สถานศึกษา / โรงเรียน" value={formData.school} onChange={handleChange} className="input-field" />
          <input type="text" name="address" placeholder="จังหวัด" value={formData.address} onChange={handleChange} className="input-field" />
          <input type="number" step="0.01" name="gpa" placeholder="GPA" value={formData.gpa} onChange={handleChange} className="input-field" required />
          <select name="major" value={formData.major} onChange={handleChange} className="input-field" required>
            <option value="">เลือกคณะที่ต้องการสมัคร</option>
            <option value="วิทยาศาสตร์">วิทยาศาสตร์</option>
            <option value="วิศวกรรมศาสตร์">วิศวกรรมศาสตร์</option>
            <option value="แพทยศาสตร์">แพทยศาสตร์</option>
          </select>
        </div>

        {/* --- ส่วนอัปโหลดไฟล์ --- */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) setImage(e.target.files);
            }}
          />
          <label htmlFor="file" className="cursor-pointer text-blue-700 hover:underline">
            อัปโหลดไฟล์ Portfolio (pdf, doc, jpg)
          </label>
          {image && image[0] && (
            <p className="mt-2 text-sm text-gray-600">
              ไฟล์ที่เลือก: {image[0].name}
            </p>
          )}
        </div>

        {/* --- ส่วนปุ่ม Submit --- */}
        <div className="text-center">
          <button type="submit" className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition">
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
}