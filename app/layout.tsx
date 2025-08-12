import type React from "react"
import { AuthProvider } from "../context/AuthContext"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} overflow-x-hidden min-h-screen`}>
        <div className="w-full max-w-full overflow-x-hidden">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  )
}
