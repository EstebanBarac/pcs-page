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
            Al realizar una compra en nuestro sitio web, el cliente acepta estos términos y condiciones en su totalidad. Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso, por lo que recomendamos revisarlos.
            </p>
            <h3 className="text-lg font-semibold">2. Productos y precios</h3>
            <p>
              Nos esforzamos por mantener la información de nuestros productos y precios actualizada y precisa. Sin embargo, pueden ocurrir errores. Nos reservamos el derecho de corregir cualquier error y cambiar o actualizar la información en cualquier momento sin previo aviso.
            </p>
            <h3 className="text-lg font-semibold">3. Envíos y devoluciones</h3>
            <p>
            Ofrecemos diferentes métodos de envío para adaptarnos a tus necesidades. Los plazos de entrega estimados se detallarán en el momento de la compra. No nos responsabilizamos por demoras atribuibles a la empresa de mensajería o a factores externos a nuestro control.
            </p>
            <h3 className="text-lg font-semibold">4. Privacidad y seguridad</h3>
            <p>
              Su privacidad es importante para nosotros, en cumplimiento con las normativas de protección de datos, garantizamos la confidencialidad y seguridad de la información personal de nuestros usuarios.
            </p>
            <h3 className="text-lg font-semibold">5. Imágenes Ilustrativas</h3>
            <p>
              Las imágenes de los productos en nuestro sitio web son de carácter ilustrativo y pueden no representar fielmente el producto final recibido, especialmente en lo que respecta a detalles estéticos como colores o acabados. Nos esforzamos por mantener la información lo más precisa posible, pero pueden existir variaciones leves. Recomendamos leer atentamente la descripción del producto para obtener los detalles específicos.
            </p>
            <h3 className="text-lg font-semibold">6. Limitación de responsabilidad</h3>
            <p>
              En ningún caso seremos responsables por daños indirectos, incidentales, especiales o consecuentes que resulten del uso de nuestros productos o servicios.
            </p>
            <h3 className="text-lg font-semibold">7. Garantía</h3>
            <p>
              Ofrecemos garantía en cada producto según las políticas del fabricante y nuestra tienda. Para productos de outlet o reacondicionados, la garantía puede ser limitada.
            </p>
            <h3 className="text-lg font-semibold">8. Cambios en los términos</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Le recomendamos que revise esta página periódicamente para mantenerse informado de cualquier cambio.
            </p>
            <h3 className="text-lg font-semibold">9. Contacto</h3>
            <p>
            Para cualquier consulta o reclamación sobre una compra, puedes comunicarte con nuestro equipo de atención al cliente a través de los datos de contacto proporcionados en el sitio.
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