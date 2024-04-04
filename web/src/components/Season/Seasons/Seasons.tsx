import type {
  DeleteSeasonMutation,
  DeleteSeasonMutationVariables,
  FindSeasons,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Season/SeasonsCell'
import { truncate } from 'src/lib/formatters'

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

const SeasonsList = ({ seasons }: FindSeasons) => {
  const [deleteSeason] = useMutation(DELETE_SEASON_MUTATION, {
    onCompleted: () => {
      toast.success('Season deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteSeasonMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete season ' + id + '?')) {
      deleteSeason({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Year</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((season) => (
            <tr key={season.id}>
              <td>{truncate(season.id)}</td>
              <td>{truncate(season.year)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.season({ id: season.id })}
                    title={'Show season ' + season.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSeason({ id: season.id })}
                    title={'Edit season ' + season.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete season ' + season.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(season.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SeasonsList
