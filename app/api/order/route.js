import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/order — crear nueva orden
export async function POST(request) {
  try {
    const body = await request.json();
    const { tableNumber, items } = body;

    if (!tableNumber || !items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Datos inválidos' }), { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        tableNumber,
        orderItems: {
          create: items.map(item => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity
          }))
        }
      },
      include: { orderItems: true }
    });

    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear orden' }), { status: 500 });
  }
}


// GET /api/order — obtener todas las órdenes
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { orderItems: true }
    });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Error al obtener órdenes' }), { status: 500 });
  }
}
