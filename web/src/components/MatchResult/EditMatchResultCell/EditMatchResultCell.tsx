import type {
  EditMatchResultById,
  UpdateMatchResultInput,
  UpdateMatchResultMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MatchResultForm from 'src/components/MatchResult/MatchResultForm'

export const QUERY: TypedDocumentNode<EditMatchResultById> = gql`
  query EditMatchResultById($id: Int!) {
    matchResult: matchResult(id: $id) {
      id
      matchupId
      player1Id
      player2Id
      player1Score
      player2Score
    }
  }
`

const UPDATE_MATCH_RESULT_MUTATION: TypedDocumentNode<
  EditMatchResultById,
  UpdateMatchResultMutationVariables
> = gql`
  mutation UpdateMatchResultMutation(
    $id: Int!
    $input: UpdateMatchResultInput!
  ) {
    updateMatchResult(id: $id, input: $input) {
      id
      matchupId
      player1Id
      player2Id
      player1Score
      player2Score
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  matchResult,
}: CellSuccessProps<EditMatchResultById>) => {
  const [updateMatchResult, { loading, error }] = useMutation(
    UPDATE_MATCH_RESULT_MUTATION,
    {
      onCompleted: () => {
        toast.success('MatchResult updated')
        navigate(routes.matchResults())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateMatchResultInput,
    id: EditMatchResultById['matchResult']['id']
  ) => {
    updateMatchResult({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit MatchResult {matchResult?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MatchResultForm
          matchResult={matchResult}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
