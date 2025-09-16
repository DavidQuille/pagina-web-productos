'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Esta es una autenticación simple. En una aplicación real, 
  // deberías usar un sistema de autenticación más seguro.
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Contraseña predeterminada - cambia esto por una contraseña segura
    const ADMIN_PASSWORD = 'admin123'
    
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // Guardar un token en sessionStorage
        sessionStorage.setItem('adminAuth', 'true')
        router.push('/admin')
      } else {
        setError('Contraseña incorrecta')
        setLoading(false)
      }
    }, 500) // Simulamos un pequeño retraso
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Acceso Administrativo
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ingrese la contraseña para acceder al panel de administración
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
              >
                {error}
              </motion.div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
              >
                {loading ? 'Verificando...' : 'Ingresar al Panel'}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <a href="/" className="text-sm text-indigo-600 hover:text-indigo-500">
                Volver a la tienda
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
