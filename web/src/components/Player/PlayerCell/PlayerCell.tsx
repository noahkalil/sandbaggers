import type { FindPlayerById, FindPlayerByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Player from 'src/components/Player/Player'

export const QUERY: TypedDocumentNode<
  FindPlayerById,
  FindPlayerByIdVariables
> = gql`
  query FindPlayerById($id: Int!) {
    player: player(id: $id) {
      id
      name
      teamId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Player not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindPlayerByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  player,
}: CellSuccessProps<FindPlayerById, FindPlayerByIdVariables>) => {
  return <Player player={player} />
}
