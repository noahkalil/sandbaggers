import type { FindMatchups, FindMatchupsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Matchups from 'src/components/Matchup/Matchups'

export const QUERY: TypedDocumentNode<
  FindMatchups,
  FindMatchupsVariables
> = gql`
  query FindMatchups {
    matchups {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No matchups yet. '}
      <Link to={routes.newMatchup()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindMatchups>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  matchups,
}: CellSuccessProps<FindMatchups, FindMatchupsVariables>) => {
  return <Matchups matchups={matchups} />
}
