export function Header() {
  return (
    <header className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 text-white py-10 px-6 shadow-xl">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur rounded-2xl mb-4 text-4xl">
          🔀
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">How to Create a Git Repository</h1>
        <p className="text-lg text-orange-100 max-w-2xl mx-auto">
          A step-by-step guide — from <code className="bg-white/15 px-1.5 py-0.5 rounded text-sm">git init</code> to your first push
        </p>
      </div>
    </header>
  );
}
