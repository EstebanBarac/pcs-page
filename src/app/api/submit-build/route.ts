interface Component {
  category: string;
  selected: string;
}

interface RequestData {
  components: Component[];
  customNotes?: string;
  timestamp?: string;
}

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!

export async function POST(request: Request) {
  try {
    const data: RequestData = await request.json(); // Definir el tipo de data
    
    // Crear el mensaje para Discord
    const message = {
      embeds: [{
        title: "Nueva Configuración de PC Personalizada",
        color: 0x6E3AFF, // Color morado
        fields: [
          ...data.components.map((comp: Component) => ({
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
    };

    // Enviar a Discord
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      throw new Error('Error al enviar a Discord');
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
