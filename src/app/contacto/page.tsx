'use client'

import React from 'react'

export default function ContactPage() {
  return (
    <main>
      {/* Espacio adicional para separar de la navbar */}
      <div className="pt-20"></div>
      {/* Hero de Contacto */}
      <section className="bg-gradient-to-r from-[#a34e96] to-[#3e5497] text-white py-14">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contacto</h1>
        </div>
      </section>

      {/* Información de contacto simplificada */}
      <section className="py-10 bg-white fade-in-section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* WhatsApp */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
                <div className="text-5xl mb-4 text-[#a34e96]">📱</div>
                <h3 className="text-2xl font-bold mb-2">WhatsApp</h3>
                <p className="text-gray-700 text-lg">
                  +593 98 482 0981
                </p>
                <a 
                  href="https://wa.me/593984820981" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 bg-[#3e5497] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2d3f70] transition-colors duration-300 inline-flex items-center"
                >
                  Enviar mensaje
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
              
              {/* Ubicación */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
                <div className="text-5xl mb-4 text-[#3e5497]">📍</div>
                <h3 className="text-2xl font-bold mb-2">Ubicación</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Av. Principal 123<br />
                  Ciudad Ejemplo, 12345
                </p>
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                  {/* Aquí puedes reemplazar con tu URL de Google Maps */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7978.799055324426!2d-78.48271237701181!3d-0.18015946462946665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e44d2f1b3d!2sQuito%2C%20Ecuador!5e0!3m2!1sen!2sus!4v1661293085940!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}