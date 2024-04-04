import type {
  CreateMatchResultMutation,
  CreateMatchResultInput,
  CreateMatchResultMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MatchResultForm from 'src/components/MatchResult/MatchResultForm'

const CREATE_MATCH_RESULT_MUTATION: TypedDocumentNode<
  CreateMatchResultMutation,
  CreateMatchResultMutationVariables
> = gql`
  mutation CreateMatchResultMutation($input: CreateMatchResultInput!) {
    createMatchResult(input: $input) {
      id
    }
  }
`

const NewMatchResult = () => {
  const [createMatchResult, { loading, error }] = useMutation(
    CREATE_MATCH_RESULT_MUTATION,
    {
      onCompleted: () => {
        toast.success('MatchResult created')
        navigate(routes.matchResults())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateMatchResultInput) => {
    createMatchResult({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New MatchResult</h2>
      </header>
      <div className="rw-segment-main">
        <MatchResultForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMatchResult
