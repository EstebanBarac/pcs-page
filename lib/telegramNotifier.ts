import TelegramBot from 'node-telegram-bot-api';

// Define la estructura de un producto en la orden
interface OrderItem {
  title: string;
  quantity: number;
  unit_price: number;
}

// Define la estructura de los detalles de la orden
interface OrderDetails {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  total: number;
  items: OrderItem[];
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN as string);
const chatId = process.env.TELEGRAM_CHAT_ID as string;

export async function sendTelegramNotification(orderDetails: OrderDetails) {
  const message = `
Nueva venta realizada:

ID de la orden: ${orderDetails.id}
Cliente: ${orderDetails.customer_name}
Email: ${orderDetails.customer_email}
Teléfono: ${orderDetails.customer_phone}
Dirección: ${orderDetails.address}
Total: $${orderDetails.total}

Productos:
${orderDetails.items.map((item: OrderItem) => `- ${item.title}: ${item.quantity} x $${item.unit_price}`).join('\n')}
`;

  try {
    await bot.sendMessage(chatId, message);
    console.log('Notificación de Telegram enviada');
  } catch (error) {
    console.error('Error al enviar la notificación de Telegram:', error);
  }
}
