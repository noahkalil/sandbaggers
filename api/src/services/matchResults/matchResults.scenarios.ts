import type { Prisma, MatchResult } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MatchResultCreateArgs>({
  matchResult: {
    one: {
      data: {
        player1Score: 1772431,
        player2Score: 3284929,
        matchup: {
          create: {
            week: 1929881,
            date: '2024-04-04T03:11:32.883Z',
            team1: {
              create: { name: 'String', season: { create: { year: 9122259 } } },
            },
            team2: {
              create: { name: 'String', season: { create: { year: 2777691 } } },
            },
            season: { create: { year: 6303185 } },
          },
        },
        player1: { create: { name: 'String' } },
        player2: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        player1Score: 7659966,
        player2Score: 4106892,
        matchup: {
          create: {
            week: 3694101,
            date: '2024-04-04T03:11:32.883Z',
            team1: {
              create: { name: 'String', season: { create: { year: 1956095 } } },
            },
            team2: {
              create: { name: 'String', season: { create: { year: 6152141 } } },
            },
            season: { create: { year: 5186927 } },
          },
        },
        player1: { create: { name: 'String' } },
        player2: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<MatchResult, 'matchResult'>
