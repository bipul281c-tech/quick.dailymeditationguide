import { Search } from "lucide-react"

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/70 border-b border-stone-100 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center group-hover:border-stone-500 transition-colors">
            <div className="w-2 h-2 rounded-full bg-stone-400 group-hover:bg-stone-600 transition-colors" />
          </div>
          <span className="text-sm font-semibold tracking-tighter text-stone-800">BREATHE</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-500">
          <a href="#" className="hover:text-stone-800 transition-colors">
            Practice
          </a>
          <a href="#" className="hover:text-stone-800 transition-colors">
            Sounds
          </a>
          <a href="#" className="hover:text-stone-800 transition-colors">
            Journal
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-stone-500 hover:text-stone-800 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="hidden md:block px-4 py-2 text-xs font-semibold tracking-wide bg-stone-800 text-stone-50 rounded-full hover:bg-stone-700 hover:shadow-lg hover:shadow-stone-200/50 transition-all duration-300">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  )
}
