"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./button"
import { Calendar, Home, Menu, Moon, Sun, Users, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { cn } from "../../lib/utils"

export default function Navbar() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const closeMenu = () => setIsMenuOpen(false)

    const navItems = [
        { href: "/", label: "Inicio", icon: <Home className="h-4 w-4 mr-2" /> },
        { href: "/espacios", label: "Espacios", icon: <Users className="h-4 w-4 mr-2" /> },
        { href: "/reservas", label: "Reservas", icon: <Calendar className="h-4 w-4 mr-2" /> },
    ]

    if (pathname === "/") return null

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-muted/90 backdrop-blur supports-[backdrop-filter]:bg-muted/80 shadow-sm py-6">
            <div className="container flex h-6 items-center justify-between px-4 py-4">
                <Link href="/" className="font-bold text-lg tracking-tight text-foreground">
                    CoworkSpace
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle theme"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t bg-muted">
                    <div className="container py-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className={cn(
                                    "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}

