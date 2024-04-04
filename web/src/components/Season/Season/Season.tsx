import type {
  DeleteSeasonMutation,
  DeleteSeasonMutationVariables,
  FindSeasonById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

const DELETE_SEASON_MUTATION: TypedDocumentNode<
  DeleteSeasonMutation,
  DeleteSeasonMutationVariables
> = gql`
  mutation DeleteSeasonMutation($id: Int!) {
    deleteSeason(id: $id) {
      id
    }
  }
`

interface Props {
  season: NonNullable<FindSeasonById['season']>
}

const Season = ({ season }: Props) => {
  const [deleteSeason] = useMutation(DELETE_SEASON_MUTATION, {
    onCompleted: () => {
      toast.success('Season deleted')
      navigate(routes.seasons())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteSeasonMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete season ' + id + '?')) {
      deleteSeason({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Season {season.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{season.id}</td>
            </tr>
            <tr>
              <th>Year</th>
              <td>{season.year}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSeason({ id: season.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(season.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Season
