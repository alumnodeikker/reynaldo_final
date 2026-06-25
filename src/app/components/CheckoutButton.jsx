// este componente lo voy aultilizar como una seccion donde el usurio lo mandamos a pagar para Stripe y tendria el precio de la sala 

"use client"; // Le dice a Next.js que este componente responde a clics

export default function CheckoutButton() {
  const handleCheckout = async () => {
    try {
      // Llamamos a nuestra API de pagos de Stripe
      const response = await fetch("/api/pagos", {
        method: "POST",
      });

      const data = await response.json();

      // Si Stripe nos da la URL, mandamos al usuario a pagar
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error al obtener la pasarela de pago.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      className="w-full px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm"
    >
      Alquilaer de Sala por $25.00
    </button>
  );
}
