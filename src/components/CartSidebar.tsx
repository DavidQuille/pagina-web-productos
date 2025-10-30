'use client'

import { useCart } from '@/context/CartContext'
import { jsPDF } from 'jspdf'

export default function CartSidebar() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart()

  const generatePDF = () => {
    const doc = new jsPDF()
    
    // Título
    doc.setFontSize(20)
    doc.text('Carrito de Compras', 20, 20)
    doc.setFontSize(12)
    doc.text('Para tu bebé', 20, 30)
    
    // Línea separadora
    doc.line(20, 35, 190, 35)
    
    let yPosition = 45
    
    // Encabezados
  doc.setFontSize(10)
  // Use a named font instead of undefined to satisfy TypeScript types (default jsPDF font)
  doc.setFont('helvetica', 'bold')
    doc.text('Producto', 20, yPosition)
    doc.text('Cant.', 120, yPosition)
    doc.text('Precio Unit.', 140, yPosition)
    doc.text('Subtotal', 170, yPosition)
    
    yPosition += 5
    doc.line(20, yPosition, 190, yPosition)
    yPosition += 10
    
    // Productos
  doc.setFont('helvetica', 'normal')
    cart.forEach((item) => {
      // Verificar si necesitamos una nueva página
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }
      
      // Nombre del producto (truncar si es muy largo)
      const productName = item.name.length > 35 
        ? item.name.substring(0, 35) + '...' 
        : item.name
      doc.text(productName, 20, yPosition)
      
      // Cantidad
      doc.text(item.quantity.toString(), 125, yPosition)
      
      // Precio unitario
      doc.text(`$${item.price.toFixed(2)}`, 140, yPosition)
      
      // Subtotal
      const subtotal = item.price * item.quantity
      doc.text(`$${subtotal.toFixed(2)}`, 170, yPosition)
      
      yPosition += 10
    })
    
    // Línea antes del total
    yPosition += 5
    doc.line(20, yPosition, 190, yPosition)
    yPosition += 10
    
    // Total
  doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('TOTAL:', 140, yPosition)
    doc.text(`$${getTotalPrice().toFixed(2)}`, 170, yPosition)
    
    // Pie de página
    yPosition += 20
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
    doc.text('Gracias por su preferencia', 20, yPosition)
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, yPosition + 5)
    
    // Descargar
    doc.save('carrito-compras.pdf')
  }

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#a34e96] to-[#3e5497] text-white p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Carrito de Compras</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mx-auto text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex gap-4">
                      {/* Imagen del producto */}
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Info del producto */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          ${item.price.toFixed(2)} c/u
                        </p>

                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>

                          <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Subtotal */}
                        <p className="mt-2 font-bold text-[#a34e96]">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con total y botón */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-[#a34e96]">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={generatePDF}
                className="w-full bg-gradient-to-r from-[#a34e96] to-[#3e5497] text-white py-3 rounded-lg font-semibold hover:from-[#8e4483] hover:to-[#344680] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Guardar PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
