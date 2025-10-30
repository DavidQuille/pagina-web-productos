'use client'

import { Product } from '@/lib/supabase'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative">
      <div className="h-64 overflow-hidden relative">
        {product.image_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            onError={(e) => console.error('Error cargando imagen:', e.currentTarget.src)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">Sin imagen</span>
          </div>
        )}
        {product.is_new === true && (
          <div className="absolute top-2 right-2 bg-[#3e5497] text-white px-3 py-1 rounded-full text-sm font-bold z-10">
            Nuevo
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-500 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-[#a34e96]">${product.price?.toFixed(2)}</span>
          <span className="bg-[#f5c3cf] text-[#3e5497] px-3 py-1 rounded-full text-sm font-medium capitalize">
            {product.category}
          </span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-[#a34e96] to-[#3e5497] text-white py-2 px-4 rounded-lg font-semibold hover:from-[#8e4483] hover:to-[#344680] transition-all duration-300 flex items-center justify-center gap-2"
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}
