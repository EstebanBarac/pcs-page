/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      MERCADO_PAGO_PUBLIC_KEY: process.env.MERCADO_PAGO_PUBLIC_KEY,
    },
    images: {
      remotePatterns: ['hfktfenbxjrkprdmvcle.supabase.co']
    },
  }
  
  
  module.exports = nextConfig