import type { FindSeasonById, FindSeasonByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Season from 'src/components/Season/Season'

export const QUERY: TypedDocumentNode<
  FindSeasonById,
  FindSeasonByIdVariables
> = gql`
  query FindSeasonById($id: Int!) {
    season: season(id: $id) {
      id
      year
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Season not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSeasonByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  season,
}: CellSuccessProps<FindSeasonById, FindSeasonByIdVariables>) => {
  return <Season season={season} />
}
