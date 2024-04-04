import type {
  DeleteMatchupMutation,
  DeleteMatchupMutationVariables,
  FindMatchupById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_MATCHUP_MUTATION: TypedDocumentNode<
  DeleteMatchupMutation,
  DeleteMatchupMutationVariables
> = gql`
  mutation DeleteMatchupMutation($id: Int!) {
    deleteMatchup(id: $id) {
      id
    }
  }
`

interface Props {
  matchup: NonNullable<FindMatchupById['matchup']>
}

const Matchup = ({ matchup }: Props) => {
  const [deleteMatchup] = useMutation(DELETE_MATCHUP_MUTATION, {
    onCompleted: () => {
      toast.success('Matchup deleted')
      navigate(routes.matchups())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteMatchupMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete matchup ' + id + '?')) {
      deleteMatchup({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Matchup {matchup.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{matchup.id}</td>
            </tr>
            <tr>
              <th>Week</th>
              <td>{matchup.week}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(matchup.date)}</td>
            </tr>
            <tr>
              <th>Team1 id</th>
              <td>{matchup.team1Id}</td>
            </tr>
            <tr>
              <th>Team2 id</th>
              <td>{matchup.team2Id}</td>
            </tr>
            <tr>
              <th>Season id</th>
              <td>{matchup.seasonId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMatchup({ id: matchup.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(matchup.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Matchup
