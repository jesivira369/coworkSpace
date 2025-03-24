import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "../components/theme-provider"
import { Toaster } from "../components/ui/toaster"
import Navbar from "../components/ui/navbar"
import './global.css';
import QueryProvider from "../components/query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CoworkSpace - Sistema de Gestión de Reservas",
  description: "Sistema de gestión de reservas para espacios de trabajo compartido",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="min-h-screen" suppressHydrationWarning>
      <body className={inter.className + " min-h-screen bg-background text-foreground"}>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <Navbar />
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html >
  )
}
