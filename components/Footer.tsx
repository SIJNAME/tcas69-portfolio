
export function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-8">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} TCAS69. All rights reserved.</p>
        <p className="mt-1">ติดต่อ: tcas69@gmail.com</p>
      </div>
    </footer>
  );
}
