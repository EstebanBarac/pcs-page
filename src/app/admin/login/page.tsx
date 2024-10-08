'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '../../../components/LoginForm'
import { getCurrentUser } from '../../../lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser()
      if (user) {
        router.push('/orders')
      }
    }
    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Inicie Sesión
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}