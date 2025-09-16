/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yeexjjmfszxicdpbvhry.supabase.co'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'pagina-web-productos.vercel.app']
    }
  }
}

module.exports = nextConfig
