import type {
  DeleteTeamMutation,
  DeleteTeamMutationVariables,
  FindTeamById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

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

interface Props {
  team: NonNullable<FindTeamById['team']>
}

const Team = ({ team }: Props) => {
  const [deleteTeam] = useMutation(DELETE_TEAM_MUTATION, {
    onCompleted: () => {
      toast.success('Team deleted')
      navigate(routes.teams())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTeamMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete team ' + id + '?')) {
      deleteTeam({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Team {team.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{team.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{team.name}</td>
            </tr>
            <tr>
              <th>Season id</th>
              <td>{team.seasonId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTeam({ id: team.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(team.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Team
