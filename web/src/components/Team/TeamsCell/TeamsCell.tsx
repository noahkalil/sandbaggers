import type { FindTeams, FindTeamsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Teams from 'src/components/Team/Teams'

export const QUERY: TypedDocumentNode<FindTeams, FindTeamsVariables> = gql`
  query FindTeams {
    teams {
      id
      name
      seasonId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No teams yet. '}
      <Link to={routes.newTeam()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindTeams>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  teams,
}: CellSuccessProps<FindTeams, FindTeamsVariables>) => {
  return <Teams teams={teams} />
}
