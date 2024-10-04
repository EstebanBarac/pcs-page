// app/checkout/page.tsx
'use client'

import { useState } from 'react'
import MercadoPagoCheckout from '../../components/MercadoPagoCheckout'
import { TermsAndConditionsModal } from '../../components/TermsAndConditionsModal'
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const [showTerms, setShowTerms] = useState(true)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleAcceptTerms = () => {
    setTermsAccepted(true)
    setShowTerms(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-6">
      {termsAccepted ? (
        <MercadoPagoCheckout />
      ) : (
        <div className="text-center">
          <p className="mb-4">Para continuar con la compra, por favor lea y acepte nuestros términos y condiciones.</p>
          <Button onClick={() => setShowTerms(true)}>Leer Términos y Condiciones</Button>
        </div>
      )}
      <TermsAndConditionsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={handleAcceptTerms}
      />
    </div>
  )
}