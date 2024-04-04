import type { MatchResult } from '@prisma/client'

import {
  matchResults,
  matchResult,
  createMatchResult,
  updateMatchResult,
  deleteMatchResult,
} from './matchResults'
import type { StandardScenario } from './matchResults.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('matchResults', () => {
  scenario('returns all matchResults', async (scenario: StandardScenario) => {
    const result = await matchResults()

    expect(result.length).toEqual(Object.keys(scenario.matchResult).length)
  })

  scenario(
    'returns a single matchResult',
    async (scenario: StandardScenario) => {
      const result = await matchResult({ id: scenario.matchResult.one.id })

      expect(result).toEqual(scenario.matchResult.one)
    }
  )

  scenario('creates a matchResult', async (scenario: StandardScenario) => {
    const result = await createMatchResult({
      input: {
        matchupId: scenario.matchResult.two.matchupId,
        player1Id: scenario.matchResult.two.player1Id,
        player2Id: scenario.matchResult.two.player2Id,
        player1Score: 8423210,
        player2Score: 5387302,
      },
    })

    expect(result.matchupId).toEqual(scenario.matchResult.two.matchupId)
    expect(result.player1Id).toEqual(scenario.matchResult.two.player1Id)
    expect(result.player2Id).toEqual(scenario.matchResult.two.player2Id)
    expect(result.player1Score).toEqual(8423210)
    expect(result.player2Score).toEqual(5387302)
  })

  scenario('updates a matchResult', async (scenario: StandardScenario) => {
    const original = (await matchResult({
      id: scenario.matchResult.one.id,
    })) as MatchResult
    const result = await updateMatchResult({
      id: original.id,
      input: { player1Score: 8274967 },
    })

    expect(result.player1Score).toEqual(8274967)
  })

  scenario('deletes a matchResult', async (scenario: StandardScenario) => {
    const original = (await deleteMatchResult({
      id: scenario.matchResult.one.id,
    })) as MatchResult
    const result = await matchResult({ id: original.id })

    expect(result).toEqual(null)
  })
})
