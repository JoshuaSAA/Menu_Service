import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany();
    return new Response(JSON.stringify(menuItems), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener menú' }), {
      status: 500,
    });
  }
}
