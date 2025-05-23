const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Hamburguesa Clásica',
        description: 'Pan, carne, lechuga y tomate',
        price: 89.99,
        imageUrl: 'https://example.com/burger.jpg',
      },
      {
        name: 'Papas Grandes',
        description: 'Papas crujientes tamaño grande',
        price: 49.99,
        imageUrl: 'https://example.com/fries.jpg',
      },
      {
        name: 'Refresco 600ml',
        description: 'Bebida de sabor a elegir',
        price: 29.99,
        imageUrl: 'https://example.com/soda.jpg',
      },
    ]
  });

  console.log('✅ Productos insertados');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
