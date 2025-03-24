export const mockEspacios = [
  {
    id: 1,
    nombre: 'Sala de reuniones',
    ubicacion: 'PB',
    capacidad: 20,
    descripcion: 'Sala de reuniones con proyector y pizarra',
  },
  {
    id: 2,
    nombre: 'Cowork abierto',
    ubicacion: 'PISO_1',
    capacidad: 10,
    descripcion: 'Espacio abierto con mesas y sillas',
  },
];

export const mockReservas = [
  {
    id: 1,
    espacioId: 1,
    emailCliente: 'test@correo.com',
    fechaReserva: '2025-03-28',
    horaInicio: '10:00',
    horaFin: '12:00',
    espacio: mockEspacios[0],
  },
];
