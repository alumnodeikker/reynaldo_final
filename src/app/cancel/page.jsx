import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pago cancelado
        </h1>
        <p className="text-gray-600 mb-6">
          No se ha realizado ningún cargo. Puedes intentarlo de nuevo cuando quieras.
        </p>
        <Link
          href="/"
          className="inline-block py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver a intentar
        </Link>
      </div>
    </div>
  )
}