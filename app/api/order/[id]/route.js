import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/order/:id — obtener una orden
export async function GET(_, { params }) {
  const { id } = params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: { orderItems: true }
    });

    if (!order) {
      return new Response(JSON.stringify({ error: 'Orden no encontrada' }), { status: 404 });
    }

    return new Response(JSON.stringify(order), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Error al obtener orden' }), { status: 500 });
  }
}

// DELETE /api/order/:id — eliminar orden
export async function DELETE(_, { params }) {
  const { id } = params;
  try {
    await prisma.orderItem.deleteMany({ where: { orderId: Number(id) } }); // primero los items
    await prisma.order.delete({ where: { id: Number(id) } });               // luego la orden

    return new Response(null, { status: 204 });
  } catch {
    return new Response(JSON.stringify({ error: 'Error al eliminar orden' }), { status: 500 });
  }
}


