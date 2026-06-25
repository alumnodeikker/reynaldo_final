'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import rooms from '@/data/rooms'
import RoomCard from '@/app/components/RoomCard'

export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleReserve(room) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: room.id }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error al crear el pago')

      // Redirigir al usuario a Stripe Checkout
      router.push(data.url)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">🎤 Escape Rooms VIP</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Reserva tu Sala de Escape Room
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Elige la sala que más te guste, selecciona el tiempo y paga con Stripe.
            ¡La diversión está garantizada!
          </p>
        </div>
      </section>

      {/* Listado de salas */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Nuestras Salas
        </h2>

        {error && (
          <div className="max-w-md mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onReserve={handleReserve} />
          ))}
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <p className="text-gray-700">Redirigiendo a Stripe...</p>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          © 2026 Escape Rooms VIP. Proyecto de ejemplo con Next.js y Stripe.
        </div>
      </footer>
    </div>
  )
}