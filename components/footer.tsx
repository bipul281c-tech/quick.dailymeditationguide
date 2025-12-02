import { Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-stone-300 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
          </div>
          <span className="text-xs font-semibold tracking-tighter text-stone-600">BREATHE © 2025</span>
        </div>

        <div className="flex gap-6 text-xs text-stone-500 font-medium">
          <a href="#" className="hover:text-stone-800 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-stone-800 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-stone-800 transition-colors">
            Contact
          </a>
        </div>

        <div className="flex gap-4">
          <a href="#" className="text-stone-400 hover:text-stone-800 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="text-stone-400 hover:text-stone-800 transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
