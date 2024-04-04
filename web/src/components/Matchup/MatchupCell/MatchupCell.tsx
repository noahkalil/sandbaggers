import type { FindMatchupById, FindMatchupByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Matchup from 'src/components/Matchup/Matchup'

export const QUERY: TypedDocumentNode<
  FindMatchupById,
  FindMatchupByIdVariables
> = gql`
  query FindMatchupById($id: Int!) {
    matchup: matchup(id: $id) {
      id
      week
      date
      team1Id
      team2Id
      seasonId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Matchup not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindMatchupByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  matchup,
}: CellSuccessProps<FindMatchupById, FindMatchupByIdVariables>) => {
  return <Matchup matchup={matchup} />
}
