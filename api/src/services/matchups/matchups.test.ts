import type { Matchup } from '@prisma/client'

import {
  matchups,
  matchup,
  createMatchup,
  updateMatchup,
  deleteMatchup,
} from './matchups'
import type { StandardScenario } from './matchups.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('matchups', () => {
  scenario('returns all matchups', async (scenario: StandardScenario) => {
    const result = await matchups()

    expect(result.length).toEqual(Object.keys(scenario.matchup).length)
  })

  scenario('returns a single matchup', async (scenario: StandardScenario) => {
    const result = await matchup({ id: scenario.matchup.one.id })

    expect(result).toEqual(scenario.matchup.one)
  })

  scenario('creates a matchup', async (scenario: StandardScenario) => {
    const result = await createMatchup({
      input: {
        week: 840973,
        date: '2024-04-04T03:10:17.428Z',
        team1Id: scenario.matchup.two.team1Id,
        team2Id: scenario.matchup.two.team2Id,
        seasonId: scenario.matchup.two.seasonId,
      },
    })

    expect(result.week).toEqual(840973)
    expect(result.date).toEqual(new Date('2024-04-04T03:10:17.428Z'))
    expect(result.team1Id).toEqual(scenario.matchup.two.team1Id)
    expect(result.team2Id).toEqual(scenario.matchup.two.team2Id)
    expect(result.seasonId).toEqual(scenario.matchup.two.seasonId)
  })

  scenario('updates a matchup', async (scenario: StandardScenario) => {
    const original = (await matchup({ id: scenario.matchup.one.id })) as Matchup
    const result = await updateMatchup({
      id: original.id,
      input: { week: 7937300 },
    })

    expect(result.week).toEqual(7937300)
  })

  scenario('deletes a matchup', async (scenario: StandardScenario) => {
    const original = (await deleteMatchup({
      id: scenario.matchup.one.id,
    })) as Matchup
    const result = await matchup({ id: original.id })

    expect(result).toEqual(null)
  })
})
