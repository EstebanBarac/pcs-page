// components/TermsAndConditionsModal.tsx
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TermsAndConditionsModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
}

export function TermsAndConditionsModal({ isOpen, onClose, onAccept }: TermsAndConditionsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Términos y Condiciones</DialogTitle>
          <DialogDescription>
            Por favor, lea atentamente nuestros términos y condiciones antes de continuar con su compra.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">1. Aceptación de los términos</h3>
            <p>
              Al utilizar nuestro sitio web y realizar una compra, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá realizar compras en nuestro sitio.
            </p>
            <h3 className="text-lg font-semibold">2. Productos y precios</h3>
            <p>
              Nos esforzamos por mantener la información de nuestros productos y precios actualizada y precisa. Sin embargo, pueden ocurrir errores. Nos reservamos el derecho de corregir cualquier error y cambiar o actualizar la información en cualquier momento sin previo aviso.
            </p>
            <h3 className="text-lg font-semibold">3. Envíos y devoluciones</h3>
            <p>
              Los tiempos de envío pueden variar dependiendo de su ubicación. Para más información sobre nuestra política de devoluciones, por favor visite nuestra página de Devoluciones.
            </p>
            <h3 className="text-lg font-semibold">4. Privacidad y seguridad</h3>
            <p>
              Su privacidad es importante para nosotros. Consulte nuestra Política de Privacidad para obtener información sobre cómo recopilamos, usamos y protegemos su información personal.
            </p>
            <h3 className="text-lg font-semibold">5. Limitación de responsabilidad</h3>
            <p>
              En ningún caso seremos responsables por daños indirectos, incidentales, especiales o consecuentes que resulten del uso de nuestros productos o servicios.
            </p>
            <h3 className="text-lg font-semibold">6. Ley aplicable</h3>
            <p>
              Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de Argentina, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
            </p>
            <h3 className="text-lg font-semibold">7. Cambios en los términos</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Le recomendamos que revise esta página periódicamente para mantenerse informado de cualquier cambio.
            </p>
            <h3 className="text-lg font-semibold">8. Contacto</h3>
            <p>
              Si tiene alguna pregunta sobre estos términos y condiciones, por favor contáctenos a través de nuestro formulario de contacto o envíenos un correo electrónico a support@example.com.
            </p>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancelar</Button>
          <Button onClick={onAccept} className="bg-amber-600 hover:bg-amber-400">Aceptar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}