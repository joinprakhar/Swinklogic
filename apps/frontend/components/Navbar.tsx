export default function Navbar() {
  return (
    <header className="py-6">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {/* Simple logo */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-semibold shadow">
              TG
            </div>
            <span className="font-semibold text-lg">TailGrids</span>
          </div>

          <ul className="hidden md:flex items-center gap-6 text-sm text-muted-600">
            <li><a href="#" className="hover:text-slate-900">Home</a></li>
            <li><a href="#" className="hover:text-slate-900">About</a></li>
            <li><a href="#" className="hover:text-slate-900">Pricing</a></li>
            <li><a href="#" className="hover:text-slate-900">Features</a></li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <a href="#" className="text-sm text-muted-600 hover:text-slate-900">Login</a>
          <a
            href="#"
            className="hidden sm:inline-block px-4 py-2 rounded-lg bg-primary text-white text-sm shadow hover:brightness-95"
          >
            Sign Up
          </a>
        </div>
      </nav>
    </header>
  )
}
