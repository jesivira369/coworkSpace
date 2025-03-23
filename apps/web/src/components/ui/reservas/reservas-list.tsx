"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PaginationButton } from "../pagination"
import { useToast } from "../../use-toast"
import { Calendar, Clock, Trash2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../alert-dialog"
import { useReservas } from "@/lib/hooks/useReservas"
import { api } from "@/lib/api"
import { UbicacionLabelMap } from "../../../lib/enum/ubicacion.enum"

export default function ReservasList() {
    const [currentPage, setCurrentPage] = useState(1)
    const { toast } = useToast()
    const router = useRouter()

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useReservas({ page: currentPage, limit: 10 })

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleDeleteReserva = async (id: number) => {
        try {
            await api.delete(`/reservas/${id}`)
            toast({
                title: "Reserva eliminada",
                description: "La reserva ha sido eliminada correctamente.",
            })
            refetch()
        } catch {
            toast({
                variant: "destructive",
                title: "Error al eliminar la reserva",
                description: "Ocurrió un error. Inténtalo de nuevo.",
            })
        }
    }

    if (isLoading) return <p>Cargando reservas...</p>

    if (isError || !data?.data.length) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No tienes reservas</h3>
                <p className="text-muted-foreground mb-6">
                    Aún no has realizado ninguna reserva de espacios.
                </p>
                <Button onClick={() => router.push("/reservas/nueva")}>
                    Crear tu primera reserva
                </Button>
            </div>
        )
    }

    const { data: reservas, pageCount } = data

    return (
        <div>
            <div className="space-y-4 mb-6">
                {reservas.map((reserva) => (
                    <Card key={reserva.id} className="overflow-hidden">
                        <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium">
                                            {reserva.espacio?.nombre || "Espacio"}
                                        </h3>
                                        <h3 className="font-medium">
                                            {UbicacionLabelMap[reserva.espacio?.ubicacion] ?? reserva.espacio?.ubicacion}
                                        </h3>
                                        <Badge variant="default">Reservado</Badge>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground gap-2 sm:gap-4">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <span>{reserva.fechaReserva}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span>
                                                {reserva.horaInicio} - {reserva.horaFin}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Cancelar
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción no se puede deshacer. Esto eliminará
                                                    permanentemente tu reserva.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteReserva(reserva.id)}>
                                                    Eliminar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {pageCount > 1 && (
                <div className="flex justify-center mt-6">
                    <div className="flex space-x-2">
                        <PaginationButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Anterior
                        </PaginationButton>
                        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                            <PaginationButton key={page} onClick={() => handlePageChange(page)} active={page === currentPage}>
                                {page}
                            </PaginationButton>
                        ))}
                        <PaginationButton
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === pageCount}
                        >
                            Siguiente
                        </PaginationButton>
                    </div>
                </div>
            )}
        </div>
    )
}
