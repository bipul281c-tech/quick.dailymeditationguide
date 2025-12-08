"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import { UserMenu } from "@/components/auth/user-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border transition-colors duration-300" style={{ paddingRight: 'var(--removed-body-scroll-bar-size, 0px)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <Image
            src="/logo.svg"
            alt="Daily Meditation Guide Logo"
            width={44}
            height={44}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation Links - Centered */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-muted-foreground absolute left-1/2 -translate-x-1/2">
          {siteConfig.mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-foreground transition-colors whitespace-nowrap tracking-wide",
                pathname === link.href && "text-foreground font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
            <Search className="w-5 h-5" />
          </button>
          <ModeToggle />
          <UserMenu />
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {
        mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md animate-in slide-in-from-top-2">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
              {siteConfig.mainNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2",
                    pathname === link.href && "text-foreground font-semibold"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )
      }
    </nav >
  )
}
