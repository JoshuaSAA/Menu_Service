import { PrismaClient, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

// PATCH /api/order/:id/status — actualizar estado
export async function PATCH(request, { params }) {
  const { id } = params;
  const { status } = await request.json();

  if (!status || !Object.values(OrderStatus).includes(status)) {
    return new Response(JSON.stringify({ error: 'Estado inválido' }), { status: 400 });
  }

  try {
    const updated = await prisma.order.update({
      where: { id: Number(id) },
      data: { status }
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Error al actualizar estado' }), { status: 500 });
  }
}
