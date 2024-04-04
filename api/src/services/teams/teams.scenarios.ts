import type { Prisma, Team } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TeamCreateArgs>({
  team: {
    one: { data: { name: 'String', season: { create: { year: 7382137 } } } },
    two: { data: { name: 'String', season: { create: { year: 2204416 } } } },
  },
})

export type StandardScenario = ScenarioData<Team, 'team'>
