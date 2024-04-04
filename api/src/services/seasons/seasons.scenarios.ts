import type { Prisma, Season } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SeasonCreateArgs>({
  season: {
    one: { data: { year: 6942232 } },
    two: { data: { year: 2830137 } },
  },
})

export type StandardScenario = ScenarioData<Season, 'season'>
