export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-auto" style={{ borderColor: "#BFBCBA" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-sm" style={{ color: "#737272" }}>
            © {currentYear} MC Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

