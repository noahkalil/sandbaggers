import type {
  DeleteMatchResultMutation,
  DeleteMatchResultMutationVariables,
  FindMatchResultById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

const DELETE_MATCH_RESULT_MUTATION: TypedDocumentNode<
  DeleteMatchResultMutation,
  DeleteMatchResultMutationVariables
> = gql`
  mutation DeleteMatchResultMutation($id: Int!) {
    deleteMatchResult(id: $id) {
      id
    }
  }
`

interface Props {
  matchResult: NonNullable<FindMatchResultById['matchResult']>
}

const MatchResult = ({ matchResult }: Props) => {
  const [deleteMatchResult] = useMutation(DELETE_MATCH_RESULT_MUTATION, {
    onCompleted: () => {
      toast.success('MatchResult deleted')
      navigate(routes.matchResults())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteMatchResultMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete matchResult ' + id + '?')) {
      deleteMatchResult({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            MatchResult {matchResult.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{matchResult.id}</td>
            </tr>
            <tr>
              <th>Matchup id</th>
              <td>{matchResult.matchupId}</td>
            </tr>
            <tr>
              <th>Player1 id</th>
              <td>{matchResult.player1Id}</td>
            </tr>
            <tr>
              <th>Player2 id</th>
              <td>{matchResult.player2Id}</td>
            </tr>
            <tr>
              <th>Player1 score</th>
              <td>{matchResult.player1Score}</td>
            </tr>
            <tr>
              <th>Player2 score</th>
              <td>{matchResult.player2Score}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMatchResult({ id: matchResult.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(matchResult.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default MatchResult
