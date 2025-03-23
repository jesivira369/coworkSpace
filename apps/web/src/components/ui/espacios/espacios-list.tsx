'use client'

import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card'
import { useToast } from '../../use-toast'
import { useEspacios } from '@/lib/hooks/useEspacios'
import { useEffect } from 'react'

export default function EspaciosList() {
    const { data: espacios = [], isLoading, isError } = useEspacios()
    const { toast } = useToast()

    useEffect(() => {
        if (isError) {
            toast({
                variant: "destructive",
                title: "Error al cargar espacios",
                description: "No se pudieron cargar los espacios. Por favor, intente nuevamente.",
            })
        }
    }, [isError, toast])

    if (isLoading) return <p>Cargando espacios...</p>

    if (espacios.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No hay espacios disponibles</h3>
                <p className="text-muted-foreground">No se encontraron espacios para mostrar en este momento.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {espacios.map((espacio) => (
                <Card key={espacio.id} className="flex flex-col h-full border shadow-sm">
                    <CardHeader className="pb-1 px-6 pt-6">
                        <CardTitle className="text-lg font-semibold">{espacio.nombre}</CardTitle>
                    </CardHeader>

                    <CardContent className="flex-grow px-6 pb-4">
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Users className="h-4 w-4 mr-2" />
                            <span>Capacidad: {espacio.capacidad} personas</span>
                        </div>
                        <p className="text-sm mb-1">Ubicación: <span className="font-medium">{espacio.ubicacion}</span></p>
                        {espacio.descripcion && (
                            <p className="text-sm text-muted-foreground">{espacio.descripcion}</p>
                        )}
                    </CardContent>

                    <CardFooter className="px-6 pt-4 pb-6 border-t flex justify-center">
                        <Link href={`/espacios/${espacio.id}`}>
                            <Button variant="outline" size="sm" className="group">
                                Ver detalles
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
