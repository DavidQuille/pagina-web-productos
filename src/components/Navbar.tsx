'use client'

import React from 'react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { getTotalItems, setIsCartOpen } = useCart()
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md text-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/Logo1.png" 
              alt="Logo Para tu bebé" 
              className="h-10 mr-3" 
              onError={(e) => {
                console.error('Error cargando logo:', e);
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-xl font-bold tracking-wider">Para tu bebé</span>
          </a>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="/categorias/ropa" className="nav-link text-sm font-medium text-gray-700 hover:text-[#a34e96]">Ropa Bebé</a>
          <a href="/categorias/juguetes" className="nav-link text-sm font-medium text-gray-700 hover:text-[#a34e96]">Juguetes</a>
          <a href="/categorias/accesorios" className="nav-link text-sm font-medium text-gray-700 hover:text-[#a34e96]">Accesorios</a>
          <a href="/categorias/basicos" className="nav-link text-sm font-medium text-gray-700 hover:text-[#a34e96]">Productos Básicos</a>
        </nav>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-[#3e5497] text-white p-3 rounded-full hover:bg-[#2d3f70] transition-colors duration-300 transform hover:scale-105"
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
