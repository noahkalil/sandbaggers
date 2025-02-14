import type {
  DeleteMatchResultMutation,
  DeleteMatchResultMutationVariables,
  FindMatchResults,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/MatchResult/MatchResultsCell'
import { truncate } from 'src/lib/formatters'

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

const MatchResultsList = ({ matchResults }: FindMatchResults) => {
  const [deleteMatchResult] = useMutation(DELETE_MATCH_RESULT_MUTATION, {
    onCompleted: () => {
      toast.success('MatchResult deleted')
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

  const onDeleteClick = (id: DeleteMatchResultMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete matchResult ' + id + '?')) {
      deleteMatchResult({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Matchup id</th>
            <th>Player1 id</th>
            <th>Player2 id</th>
            <th>Player1 score</th>
            <th>Player2 score</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {matchResults.map((matchResult) => (
            <tr key={matchResult.id}>
              <td>{truncate(matchResult.id)}</td>
              <td>{truncate(matchResult.matchupId)}</td>
              <td>{truncate(matchResult.player1Id)}</td>
              <td>{truncate(matchResult.player2Id)}</td>
              <td>{truncate(matchResult.player1Score)}</td>
              <td>{truncate(matchResult.player2Score)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.matchResult({ id: matchResult.id })}
                    title={'Show matchResult ' + matchResult.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editMatchResult({ id: matchResult.id })}
                    title={'Edit matchResult ' + matchResult.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete matchResult ' + matchResult.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(matchResult.id)}
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

export default MatchResultsList
