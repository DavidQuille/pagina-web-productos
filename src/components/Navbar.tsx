'use client'

import React from 'react'

export default function Navbar() {
  
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
          <a href="/categorias/basicos" className="nav-link text-sm font-medium text-gray-700 hover:text-[#a34e96]">Productos Básicos</a>
        </nav>
        <div className="flex space-x-4">
          <a href="/contacto" className="bg-[#3e5497] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#2d3f70] transition-colors duration-300 transform hover:scale-105">
            Contacto
          </a>
        </div>
      </div>
    </header>
  )
}
