/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY: process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY,
    },
    images: {
      remotePatterns: ['hfktfenbxjrkprdmvcle.supabase.co'],
    },
  }
  
  
  module.exports = nextConfig