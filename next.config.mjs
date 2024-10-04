/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY: process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY,
    },
    images: {
      domains: ['hfktfenbxjrkprdmvcle.supabase.co'],
    },
};

export default nextConfig;
