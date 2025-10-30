'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/lib/supabase'

interface ProductCarouselProps {
  products: Product[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Número de productos a mostrar por vez según el tamaño de pantalla
  const itemsPerPage = 3

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / itemsPerPage)

  // Auto-avanzar el carrusel cada 5 segundos
  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalPages, products.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Reactivar auto-play después de 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-gray-500 col-span-3 text-center py-8">
        No hay productos disponibles
      </p>
    )
  }

  // Obtener productos para la página actual
  const startIdx = currentIndex * itemsPerPage
  const currentProducts = products.slice(startIdx, startIdx + itemsPerPage)

  return (
    <div className="relative">
      {/* Productos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Controles del carrusel */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Botón anterior */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-[#a34e96] text-white hover:bg-[#8e4483] transition-colors duration-300"
            aria-label="Anterior"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Indicadores */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#a34e96] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir a página ${index + 1}`}
              />
            ))}
          </div>

          {/* Botón siguiente */}
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-[#a34e96] text-white hover:bg-[#8e4483] transition-colors duration-300"
            aria-label="Siguiente"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
