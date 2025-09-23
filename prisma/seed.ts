import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const room = await prisma.room.create({
    data: {
      code: "ABCD1234",
      players: {
        create: {
          name: "Jogador 1",
        },
      },
      gameState: {
        create: {},
      },
    },
    include: {
      players: true,
      gameState: true,
    },
  })

  console.log("Sala criada:", room)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
