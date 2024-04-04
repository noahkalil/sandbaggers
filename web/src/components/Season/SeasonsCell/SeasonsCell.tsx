import type { FindSeasons, FindSeasonsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Seasons from 'src/components/Season/Seasons'

export const QUERY: TypedDocumentNode<FindSeasons, FindSeasonsVariables> = gql`
  query FindSeasons {
    seasons {
      id
      year
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No seasons yet. '}
      <Link to={routes.newSeason()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindSeasons>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  seasons,
}: CellSuccessProps<FindSeasons, FindSeasonsVariables>) => {
  return <Seasons seasons={seasons} />
}
