'use client'

export default function RoomCard({ room, onReserve }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Placeholder de imagen */}
      <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <span className="text-6xl">🎤</span>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {room.capacity} pers.
          </span>
        </div>

        <p className="text-gray-600 mb-4">{room.description}</p>

        <p className="text-2xl font-bold text-blue-600 mb-4">
          ${room.pricePerHour.toFixed(2)} <span className="text-sm font-normal text-gray-500">/ hora</span>
        </p>

        <button
          onClick={() => onReserve(room)}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reservar ahora
        </button>
      </div>
    </div>
  )
}