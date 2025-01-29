import { NextResponse } from 'next/server'

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Crear el mensaje para Discord
    const message = {
      embeds: [{
        title: "Nueva Configuración de PC Personalizada",
        color: 0x6E3AFF, // Color morado
        fields: [
          ...data.components.map(comp => ({
            name: comp.category,
            value: comp.selected,
            inline: true
          })),
          {
            name: "Notas Personalizadas",
            value: data.customNotes || "Sin notas adicionales",
            inline: false
          }
        ],
        timestamp: data.timestamp,
        footer: {
          text: "PC Builder"
        }
      }]
    }

    // Enviar a Discord
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    })

    if (!response.ok) {
      throw new Error('Error al enviar a Discord')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}