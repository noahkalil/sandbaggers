import type {
  DeleteTeamMutation,
  DeleteTeamMutationVariables,
  FindTeams,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Team/TeamsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_TEAM_MUTATION: TypedDocumentNode<
  DeleteTeamMutation,
  DeleteTeamMutationVariables
> = gql`
  mutation DeleteTeamMutation($id: Int!) {
    deleteTeam(id: $id) {
      id
    }
  }
`

const TeamsList = ({ teams }: FindTeams) => {
  const [deleteTeam] = useMutation(DELETE_TEAM_MUTATION, {
    onCompleted: () => {
      toast.success('Team deleted')
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

  const onDeleteClick = (id: DeleteTeamMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete team ' + id + '?')) {
      deleteTeam({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Season id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{truncate(team.id)}</td>
              <td>{truncate(team.name)}</td>
              <td>{truncate(team.seasonId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.team({ id: team.id })}
                    title={'Show team ' + team.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTeam({ id: team.id })}
                    title={'Edit team ' + team.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete team ' + team.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(team.id)}
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

export default TeamsList
