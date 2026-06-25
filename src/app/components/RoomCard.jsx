//Aca voy a crear el componete que voy a utilizar para pintar lo que seria las salas 
// llevara Nombre , precio , imagenes. 

'use client'

import { iniciarPagoReserva } from '@/lib/actions/reservas'  // 👈 antes: crearReserva
import { useRouter } from 'next/navigation'                   // 👈 nuevo import
// ...el resto de imports igual

export default function VipClient({ salas }) {
  const router = useRouter()  // 👈 nuevo

  // ...estado igual: salaSeleccionada, fecha, hora, duracion...

  function reservar() {
    if (!puedeReservar) return
    setError(null)
    startTransition(async () => {
      try {
        // antes: await crearReserva({ ... }); setReservado(true)
        const url = await iniciarPagoReserva({
          sala_id: salaSeleccionada,
          fecha,
          hora,
          duracionHoras: horas,
        })
        router.push(url)  // 👈 mandamos al usuario a la página de pago de Stripe
      } catch (err) {
        setError(err.message)
      }
    })
  }


}