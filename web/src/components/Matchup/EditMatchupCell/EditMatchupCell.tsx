import type {
  EditMatchupById,
  UpdateMatchupInput,
  UpdateMatchupMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MatchupForm from 'src/components/Matchup/MatchupForm'

export const QUERY: TypedDocumentNode<EditMatchupById> = gql`
  query EditMatchupById($id: Int!) {
    matchup: matchup(id: $id) {
      id
      week
      date
      team1Id
      team2Id
      seasonId
    }
  }
`

const UPDATE_MATCHUP_MUTATION: TypedDocumentNode<
  EditMatchupById,
  UpdateMatchupMutationVariables
> = gql`
  mutation UpdateMatchupMutation($id: Int!, $input: UpdateMatchupInput!) {
    updateMatchup(id: $id, input: $input) {
      id
      week
      date
      team1Id
      team2Id
      seasonId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ matchup }: CellSuccessProps<EditMatchupById>) => {
  const [updateMatchup, { loading, error }] = useMutation(
    UPDATE_MATCHUP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Matchup updated')
        navigate(routes.matchups())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateMatchupInput,
    id: EditMatchupById['matchup']['id']
  ) => {
    updateMatchup({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Matchup {matchup?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MatchupForm
          matchup={matchup}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
