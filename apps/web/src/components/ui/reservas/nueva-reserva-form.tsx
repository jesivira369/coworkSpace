"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../select"
import { Input } from "../input"
import { Label } from "../label"
import { Button } from "../button"
import { Card, CardContent } from "../card"
import { Calendar, Clock } from "lucide-react"
import { useToast } from "../../use-toast"
import { useEspaciosScroll } from "../../../lib/hooks/useEspaciosScroll"
import { createReserva, CreateReservaInput } from "../../../lib/hooks/useCreateReserva"
import { UbicacionLabelMap } from "../../../lib/enum/ubicacion.enum"

const formSchema = z
    .object({
        espacioId: z.string().min(1, "Selecciona un espacio"),
        emailCliente: z.string().email("Email no válido"),
        fechaReserva: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato debe ser YYYY-MM-DD"),
        horaInicio: z.string().min(1, "Hora requerida"),
        horaFin: z.string().min(1, "Hora requerida"),
    })
    .refine((data) => data.horaFin > data.horaInicio, {
        message: "La hora de fin debe ser posterior a la de inicio",
        path: ["horaFin"],
    })

export default function NuevaReservaForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
    })
    const { toast } = useToast()
    const router = useRouter()
    const {
        data: espacios,
        fetchNextPage,
        hasNextPage,
    } = useEspaciosScroll()

    const onSubmit = async (values: CreateReservaInput) => {
        try {
            await createReserva(values)
            toast({ title: "Reserva creada exitosamente" })
            router.push("/reservas")
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: `Ocurrió un error al crear la reserva: ${error.response.data.message}`,
            })
        }
    }

    const today = new Date().toISOString().split("T")[0]

    return (
        <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="espacioId">Espacio</Label>
                        <Select
                            onValueChange={(value) => setValue("espacioId", value)}
                            defaultValue=""
                        >
                            <SelectTrigger id="espacioId">
                                <SelectValue placeholder="Selecciona un espacio" />
                            </SelectTrigger>
                            <SelectContent
                                onScroll={(e) => {
                                    const bottom =
                                        e.currentTarget.scrollTop + e.currentTarget.clientHeight ===
                                        e.currentTarget.scrollHeight
                                    if (bottom && hasNextPage) fetchNextPage()
                                }}
                            >
                                {espacios?.pages.flatMap((page) => page.data).map((espacio) => (
                                    <SelectItem key={espacio.id} value={String(espacio.id)}>
                                        {espacio.nombre} - {UbicacionLabelMap[espacio.ubicacion]} - {espacio.capacidad} personas
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.espacioId && (
                            <p className="text-sm text-red-500">{errors.espacioId.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="emailCliente">Email</Label>
                        <Input id="emailCliente" {...register("emailCliente")} />
                        {errors.emailCliente && (
                            <p className="text-sm text-red-500">{errors.emailCliente.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fechaReserva">Fecha</Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="date"
                                min={today}
                                className="pl-10"
                                {...register("fechaReserva")}
                            />
                        </div>
                        {errors.fechaReserva && (
                            <p className="text-sm text-red-500">{errors.fechaReserva.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="horaInicio">Hora de inicio</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="time" className="pl-10" {...register("horaInicio")} />
                            </div>
                            {errors.horaInicio && (
                                <p className="text-sm text-red-500">{errors.horaInicio.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="horaFin">Hora de fin</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="time" className="pl-10" {...register("horaFin")} />
                            </div>
                            {errors.horaFin && (
                                <p className="text-sm text-red-500">{errors.horaFin.message}</p>
                            )}
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Creando reserva..." : "Crear Reserva"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
