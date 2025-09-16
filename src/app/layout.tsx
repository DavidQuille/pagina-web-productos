import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Para tu bebé | Productos con amor para los más pequeños',
  description: 'Encuentra todo lo que necesitas para tu bebé en un solo lugar.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="text-gray-800 font-['Inter',sans-serif] bg-[#f8f9fa]">
        <Navbar />
        {/* No añadimos espacio base aquí, cada página lo controla */}
        {children}
        <footer id="contacto" className="bg-gradient-to-r from-[#a34e96] to-[#3e5497] text-white py-8">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2025 Para tu bebé. Todos los derechos reservados.</p>
            <div className="mt-3 text-xs text-gray-200">
              <a href="/admin-login" className="hover:text-white transition-colors">Admin</a>
            </div>
          </div>
        </footer>
          <Script id="intersection-observer" strategy="afterInteractive">
          {`
            // Lógica para Animaciones al hacer Scroll
            function setupAnimations() {
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                  }
                });
              }, {
                threshold: 0.05, // Menor umbral: se activa cuando el 5% del elemento es visible en lugar del 10%
                rootMargin: '0px 0px -10% 0px' // Se activa un poco antes de que el elemento entre en la vista
              });
              
              const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
              console.log("Elementos para animar:", sectionsToAnimate.length);
              sectionsToAnimate.forEach(section => {
                observer.observe(section);
              });
            }
            
            // Asegurar que se ejecuta cuando el DOM está listo
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              setTimeout(setupAnimations, 200); // Mucho más rápido: 200ms en lugar de 1000ms
            } else {
              document.addEventListener('DOMContentLoaded', function() {
                setTimeout(setupAnimations, 200); // Mucho más rápido: 200ms en lugar de 1000ms
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
