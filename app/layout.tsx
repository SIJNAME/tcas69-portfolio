import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "TCAS69 Portfolio",
  description: "ระบบ Portfolio สำหรับ TCAS69",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      {/* 1. เพิ่ม 3 classes นี้ที่ body */}
      <body className="bg-gray-50 font-sans text-gray-900 min-h-screen flex flex-col">
        <Navbar />
        {/* 2. เพิ่ม class `flex-grow` ที่ main เพื่อดัน footer ลงไป */}
        <main className="container mx-auto px-4 py-6 flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}