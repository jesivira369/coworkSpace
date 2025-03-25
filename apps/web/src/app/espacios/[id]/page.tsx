"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Skeleton } from "../../../components/skeleton"
import { ArrowLeft } from "lucide-react"
import { useEspacioById } from "../../../lib/hooks/useEspacioById"
import { Card, CardContent } from "../../../components/ui/card"
import { Suspense } from "react"
import ReservasList from "../../../components/ui/reservas/reservas-list"
import { UbicacionLabelMap } from "../../../lib/enum/ubicacion.enum"

export default function EspacioPage() {
    const { id } = useParams()
    const espacioId = Number(id)
    const { data: espacio, isLoading } = useEspacioById(id as string)

    if (isLoading) return <EspacioDetailSkeleton />
    if (!espacio) return <p>No se encontró el espacio</p>

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div>
                <Link href="/espacios">
                    <Button variant="ghost" className="pl-0 flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a espacios
                    </Button>
                </Link>
            </div>

            <Card>
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold">{espacio.nombre}</h2>
                    <p className="text-muted-foreground">{espacio.descripcion || "Sin descripción disponible."}</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p><span className="font-medium text-foreground">Ubicación:</span> {UbicacionLabelMap[espacio.ubicacion]}</p>
                        <p><span className="font-medium text-foreground">Capacidad:</span> {espacio.capacidad} personas</p>
                    </div>
                </CardContent>
            </Card>

            <div>
                <h3 className="text-xl font-semibold mb-2">Reservas del espacio</h3>
                <Suspense fallback={<p>Cargando reservas...</p>}>
                    <ReservasList espacioId={espacioId} />
                </Suspense>
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
