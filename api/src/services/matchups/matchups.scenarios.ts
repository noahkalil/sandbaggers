import type { Prisma, Matchup } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MatchupCreateArgs>({
  matchup: {
    one: {
      data: {
        week: 887173,
        date: '2024-04-04T03:10:17.511Z',
        team1: {
          create: { name: 'String', season: { create: { year: 9121217 } } },
        },
        team2: {
          create: { name: 'String', season: { create: { year: 7148783 } } },
        },
        season: { create: { year: 2589284 } },
      },
    },
    two: {
      data: {
        week: 549647,
        date: '2024-04-04T03:10:17.511Z',
        team1: {
          create: { name: 'String', season: { create: { year: 9072345 } } },
        },
        team2: {
          create: { name: 'String', season: { create: { year: 9082891 } } },
        },
        season: { create: { year: 8401036 } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Matchup, 'matchup'>
