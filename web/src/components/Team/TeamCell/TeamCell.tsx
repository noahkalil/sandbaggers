import type { FindTeamById, FindTeamByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Team from 'src/components/Team/Team'

export const QUERY: TypedDocumentNode<
  FindTeamById,
  FindTeamByIdVariables
> = gql`
  query FindTeamById($id: Int!) {
    team: team(id: $id) {
      id
      name
      seasonId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Team not found</div>

export const Failure = ({ error }: CellFailureProps<FindTeamByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  team,
}: CellSuccessProps<FindTeamById, FindTeamByIdVariables>) => {
  return <Team team={team} />
}
