import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16 relative">
      <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-b from-stone-100 to-transparent rounded-full blur-3xl -z-10 animate-breathe" />

      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200/60 shadow-sm text-xs font-medium text-stone-500 mb-8 blur-reveal">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        New: Sleep Stories available
      </span>

      <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-stone-800 mb-6 blur-reveal delay-100 text-balance">
        Find your <span className="text-stone-400 italic font-serif">center</span>.
      </h1>

      <p className="text-lg text-stone-500 max-w-lg mx-auto leading-relaxed mb-10 blur-reveal delay-200 text-pretty">
        Immersive audio landscapes designed to help you focus, breathe, and restore balance to your day.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 blur-reveal delay-300">
        <button className="px-8 py-3.5 bg-stone-800 text-white rounded-full text-sm font-semibold tracking-wide hover:bg-stone-700 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-stone-200 flex items-center gap-2 group">
          Start Session
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
        <button className="px-8 py-3.5 bg-white text-stone-600 border border-stone-200 rounded-full text-sm font-semibold tracking-wide hover:bg-stone-50 hover:border-stone-300 transition-all duration-300">
          Explore Library
        </button>
      </div>
    </div>
  )
}
