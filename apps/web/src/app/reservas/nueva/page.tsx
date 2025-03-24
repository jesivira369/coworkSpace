import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { Skeleton } from "../../../components/skeleton"
import NuevaReservaForm from "../../../components/ui/reservas/nueva-reserva-form"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
    title: "Nueva Reserva | CoworkSpace",
    description: "Crea una nueva reserva para un espacio de trabajo",
}

export default function NuevaReservaPage({
    searchParams,
}: {
    searchParams: { espacioId?: string }
}) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/reservas">
                    <Button variant="ghost" className="pl-0 flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a reservas
                    </Button>
                </Link>
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Nueva Reserva</h1>
                <p className="text-muted-foreground">Completa el formulario para reservar un espacio de trabajo.</p>
            </div>

            <Suspense fallback={<NuevaReservaFormSkeleton />}>
                <NuevaReservaForm />
            </Suspense>
        </div>
    )
}

function NuevaReservaFormSkeleton() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    )
}

