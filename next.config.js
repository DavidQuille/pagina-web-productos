/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yeexjjmfszxicdpbvhry.supabase.co'],
  },
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig
