import { NextResponse } from 'next/server'
import stripe from '@/lib/stripe'
import rooms from '@/data/rooms'

export async function POST(request) {
  try {
    const { roomId } = await request.json()

    // Buscar la sala en el array local
    const room = rooms.find((r) => r.id === roomId)
    if (!room) {
      return NextResponse.json({ error: 'Sala no encontrada' }, { status: 404 })
    }

    // Crear la sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: room.name,
              description: room.description,
            },
            unit_amount: Math.round(room.pricePerHour * 100), // Stripe usa centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error al crear sesión de Stripe:', error)
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    )
  }
}