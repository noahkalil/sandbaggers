import type { FindMatchResults, FindMatchResultsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import MatchResults from 'src/components/MatchResult/MatchResults'

export const QUERY: TypedDocumentNode<
  FindMatchResults,
  FindMatchResultsVariables
> = gql`
  query FindMatchResults {
    matchResults {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No matchResults yet. '}
      <Link to={routes.newMatchResult()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindMatchResults>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  matchResults,
}: CellSuccessProps<FindMatchResults, FindMatchResultsVariables>) => {
  return <MatchResults matchResults={matchResults} />
}
