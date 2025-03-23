'use client'

import Link from "next/link"
import { Button } from "../components/ui/button"
import Footer from "@/components/ui/footer"
import { ArrowRight, Calendar, Home, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">CoworkSpace</h1>
          <p className="mt-2">Sistema de Gestión de Reservas para Espacios de Trabajo</p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Bienvenido a nuestro sistema de reservas</h2>
          <p className="text-muted-foreground mb-6">
            Gestiona fácilmente la reserva de salas de reuniones y áreas de trabajo compartido.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Espacios Disponibles</h3>
              <p className="text-muted-foreground mb-4">
                Explora todos nuestros espacios de trabajo y salas de reuniones disponibles.
              </p>
              <Link href="/espacios" className="inline-block">
                <Button variant="outline" className="mt-2 group">
                  Ver espacios
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Mis Reservas</h3>
              <p className="text-muted-foreground mb-4">Visualiza y gestiona todas tus reservas actuales y pasadas.</p>
              <Link href="/reservas" className="inline-block">
                <Button variant="outline" className="mt-2 group">
                  Ver reservas
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Nueva Reserva</h3>
              <p className="text-muted-foreground mb-4">
                Crea una nueva reserva para un espacio de trabajo o sala de reuniones.
              </p>
              <Link href="/reservas/nueva" className="inline-block">
                <Button variant="outline" className="mt-2 group">
                  Crear reserva
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

