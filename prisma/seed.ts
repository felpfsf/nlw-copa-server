import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Lorenzo Ritchie',
      email: 'lorenritchie@gmail.com',
      avatarUrl:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1090.jpg'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Bolão do Ritchie',
      code: 'BOLRTC',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-20T13:00:00.000Z',
      firstTeamCountryCode: 'QA',
      secondTeamCountryCode: 'GH'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-21T10:00:00.000Z',
      firstTeamCountryCode: 'GB',
      secondTeamCountryCode: 'IR',

      guesses: {
        create: {
          firstTeamPoints: 3,
          secondTeamPoints: 1,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()
