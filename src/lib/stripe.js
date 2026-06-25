import Stripe from 'stripe'

// Inicializa Stripe con la clave secreta del servidor
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default stripe