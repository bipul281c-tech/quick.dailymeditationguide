import Image from "next/image"
import Link from "next/link"
import { Instagram, Twitter } from "lucide-react"
import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Daily Meditation Guide Logo"
            width={36}
            height={36}
          />
          <span className="text-sm font-semibold tracking-tighter text-foreground">DAILY MEDITATION GUIDE © 2025</span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground font-medium">
          {siteConfig.footerNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social links - Add real URLs when available
        <div className="flex gap-4">
          <a href="https://instagram.com/dailymeditationguide" className="text-muted-foreground hover:text-celadon-dark transition-colors" aria-label="Follow us on Instagram" rel="noopener noreferrer" target="_blank">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://twitter.com/dailymedguide" className="text-muted-foreground hover:text-celadon-dark transition-colors" aria-label="Follow us on Twitter" rel="noopener noreferrer" target="_blank">
            <Twitter className="w-4 h-4" />
          </a>
        </div>
        */}
      </div>
    </footer>
  )
}
