import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface OrderConfirmationEmailProps {
    customerName: string;
    orderId: string;
    orderTotal: number;
  }
  
  export const OrderConfirmationEmail = ({
    customerName,
    orderId,
    orderTotal,
  }: OrderConfirmationEmailProps) => (
    <Html>
      <Head />
      <Preview>Confirmación de tu orden en TuTienda</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Gracias por tu compra, {customerName}!</Heading>
          <Text style={text}>
            Tu orden ha sido confirmada y está siendo procesada. Aquí están los detalles de tu compra:
          </Text>
          <Text style={orderDetails}>
            Número de Orden: <strong>{orderId}</strong>
          </Text>
          <Text style={orderDetails}>
            Total: <strong>${orderTotal.toFixed(2)}</strong>
          </Text>
          <Text style={text}>
            Puedes verificar el estado de tu orden en cualquier momento utilizando este enlace:
          </Text>
          <Link href={`https://tutienda.com/order-status?id=${orderId}`} style={button}>
            Ver Estado de la Orden
          </Link>
          <Text style={text}>
            Si tienes alguna pregunta sobre tu orden, no dudes en contactarnos.
          </Text>
          <Text style={text}>Gracias por comprar en TuTienda!</Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default OrderConfirmationEmail;
  
  const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };
  
  const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
  };
  
  const h1 = {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
    textAlign: 'center' as const,
  };
  
  const text = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '26px',
    margin: '16px 0',
  };
  
  const orderDetails = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '26px',
    margin: '16px 0',
    textAlign: 'center' as const,
  };
  
  const button = {
    backgroundColor: '#5469d4',
    borderRadius: '4px',
    color: '#fff',
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    textDecoration: 'none',
    width: '100%',
    padding: '12px',
  };