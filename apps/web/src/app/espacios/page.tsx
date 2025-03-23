import { Suspense } from "react"
import type { Metadata } from "next"
import EspaciosList from "../../components/ui/espacios/espacios-list"
import { Skeleton } from "../../components/skeleton"

export const metadata: Metadata = {
    title: "Espacios Disponibles | CoworkSpace",
    description: "Explora todos nuestros espacios de trabajo y salas de reuniones disponibles",
}

export default function EspaciosPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Espacios Disponibles</h1>
                <p className="text-muted-foreground">
                    Explora todos nuestros espacios de trabajo y salas de reuniones disponibles para reservar.
                </p>
            </div>

            <Suspense fallback={<EspaciosListSkeleton />}>
                <EspaciosList />
            </Suspense>
        </div>
    )
}

function EspaciosListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex justify-between items-center pt-2">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-9 w-24" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}