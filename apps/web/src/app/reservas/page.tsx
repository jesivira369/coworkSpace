import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "../../components/skeleton"
import ReservasList from "../../components/ui/reservas/reservas-list"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
    title: "Mis Reservas | CoworkSpace",
    description: "Gestiona tus reservas de espacios de trabajo",
}

export default function ReservasPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Mis Reservas</h1>
                    <p className="text-muted-foreground">Visualiza y gestiona todas tus reservas de espacios de trabajo.</p>
                </div>
                <Link href="/reservas/nueva">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Reserva
                    </Button>
                </Link>
            </div>

            <Suspense fallback={<ReservasListSkeleton />}>
                <ReservasList />
            </Suspense>
        </div>
    )
}

function ReservasListSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-card rounded-lg shadow-sm p-4 border border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-9 w-24" />
                            <Skeleton className="h-9 w-24" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

