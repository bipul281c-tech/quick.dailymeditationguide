import Image from "next/image"
import { Search } from "lucide-react"

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/70 border-b border-border transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            alt="Breathe Logo"
            width={44}
            height={44}
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-base font-semibold tracking-tighter text-foreground">BREATHE</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Practice
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Sounds
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Journal
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="hidden md:block px-4 py-2 text-xs font-semibold tracking-wide bg-primary text-primary-foreground rounded-full hover:bg-celadon-dark hover:shadow-lg hover:shadow-celadon/30 transition-all duration-300">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  )
}
