import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Breathe | Guided Meditation & Sleep Stories",
    template: "%s | Breathe",
  },
  description:
    "Immersive audio landscapes, guided meditations, and sleep stories designed to help you focus, breathe, and restore balance to your day. Find your center with Breathe.",
  applicationName: "Breathe",
  authors: [{ name: "Breathe Team" }],
  generator: "v0.app",
  keywords: ["meditation", "mindfulness", "sleep stories", "focus", "relaxation", "ambient sounds", "guided meditation", "breathing exercises"],
  referrer: "origin-when-cross-origin",
  creator: "Breathe Team",
  publisher: "Breathe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.quick.dailymeditationguide.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Breathe | Guided Meditation & Sleep Stories",
    description:
      "Immersive audio landscapes, guided meditations, and sleep stories designed to help you focus, breathe, and restore balance to your day.",
    url: "https://www.quick.dailymeditationguide.com",
    siteName: "Breathe",
    images: [
      {
        url: "/calm-ocean-waves-at-sunset.jpg", // Using existing high-quality image
        width: 1200,
        height: 630,
        alt: "Breathe - Guided Meditation & Sleep Stories",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breathe | Guided Meditation & Sleep Stories",
    description:
      "Immersive audio landscapes, guided meditations, and sleep stories designed to help you focus, breathe, and restore balance to your day.",
    images: ["/calm-ocean-waves-at-sunset.jpg"], // Using existing high-quality image
    creator: "@breathe_app", // Placeholder
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/logo.svg", color: "#A3D1A0" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Breathe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport = {
  themeColor: "#A3D1A0",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
