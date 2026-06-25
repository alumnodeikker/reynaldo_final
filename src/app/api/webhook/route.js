import { NextResponse } from 'next/server'
import stripe from '@/lib/stripe'

export async function POST(request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    // Verificar la firma del webhook
    let event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error('Error verificando firma del webhook:', err.message)
      return NextResponse.json(
        { error: 'Firma del webhook inválida' },
        { status: 400 }
      )
    }

    // Manejar el evento según su tipo
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('✅ Pago completado:', event.data.object.id)
        // Aquí podrías actualizar estado sin BD real
        break

      case 'checkout.session.expired':
        console.log('⏰ Sesión expirada:', event.data.object.id)
        break

      default:
        console.log(`ℹ️ Evento no manejado: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error en webhook:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}