import type {
  FindMatchResultById,
  FindMatchResultByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import MatchResult from 'src/components/MatchResult/MatchResult'

export const QUERY: TypedDocumentNode<
  FindMatchResultById,
  FindMatchResultByIdVariables
> = gql`
  query FindMatchResultById($id: Int!) {
    matchResult: matchResult(id: $id) {
      id
      matchupId
      player1Id
      player2Id
      player1Score
      player2Score
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>MatchResult not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindMatchResultByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  matchResult,
}: CellSuccessProps<FindMatchResultById, FindMatchResultByIdVariables>) => {
  return <MatchResult matchResult={matchResult} />
}
