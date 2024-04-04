import type {
  DeleteMatchupMutation,
  DeleteMatchupMutationVariables,
  FindMatchups,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Matchup/MatchupsCell'
import { timeTag, truncate } from 'src/lib/formatters'

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

const MatchupsList = ({ matchups }: FindMatchups) => {
  const [deleteMatchup] = useMutation(DELETE_MATCHUP_MUTATION, {
    onCompleted: () => {
      toast.success('Matchup deleted')
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

  const onDeleteClick = (id: DeleteMatchupMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete matchup ' + id + '?')) {
      deleteMatchup({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Week</th>
            <th>Date</th>
            <th>Team1 id</th>
            <th>Team2 id</th>
            <th>Season id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {matchups.map((matchup) => (
            <tr key={matchup.id}>
              <td>{truncate(matchup.id)}</td>
              <td>{truncate(matchup.week)}</td>
              <td>{timeTag(matchup.date)}</td>
              <td>{truncate(matchup.team1Id)}</td>
              <td>{truncate(matchup.team2Id)}</td>
              <td>{truncate(matchup.seasonId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.matchup({ id: matchup.id })}
                    title={'Show matchup ' + matchup.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editMatchup({ id: matchup.id })}
                    title={'Edit matchup ' + matchup.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete matchup ' + matchup.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(matchup.id)}
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

export default MatchupsList
