"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Skeleton } from "../../../components/skeleton"
import { ArrowLeft } from "lucide-react"
import { useEspacioById } from "../../../lib/hooks/useEspacioById"

export default function EspacioPage() {
    const { id } = useParams()
    const { data: espacio, isLoading } = useEspacioById(id as string)

    if (isLoading) return <EspacioDetailSkeleton />
    if (!espacio) return <p>No se encontró el espacio</p>

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/espacios">
                    <Button variant="ghost" className="pl-0 flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a espacios
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-3xl font-bold">{espacio.nombre}</h2>
                    <p className="text-muted-foreground text-lg">{espacio.descripcion || "Sin descripción disponible."}</p>
                </div>
                <div className="lg:col-span-1 space-y-4 text-sm text-muted-foreground">
                    <div>
                        <span className="font-medium text-foreground">Ubicación:</span> {espacio.ubicacion}
                    </div>
                    <div>
                        <span className="font-medium text-foreground">Capacidad:</span> {espacio.capacidad} personas
                    </div>
                </div>
            </div>
        </div>
    )
}

function EspacioDetailSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
            </div>
            <div className="lg:col-span-1 space-y-4">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
            </div>
        </div>
    )
}
