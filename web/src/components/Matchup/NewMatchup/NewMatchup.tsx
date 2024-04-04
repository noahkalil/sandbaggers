import type {
  CreateMatchupMutation,
  CreateMatchupInput,
  CreateMatchupMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MatchupForm from 'src/components/Matchup/MatchupForm'

const CREATE_MATCHUP_MUTATION: TypedDocumentNode<
  CreateMatchupMutation,
  CreateMatchupMutationVariables
> = gql`
  mutation CreateMatchupMutation($input: CreateMatchupInput!) {
    createMatchup(input: $input) {
      id
    }
  }
`

const NewMatchup = () => {
  const [createMatchup, { loading, error }] = useMutation(
    CREATE_MATCHUP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Matchup created')
        navigate(routes.matchups())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateMatchupInput) => {
    createMatchup({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Matchup</h2>
      </header>
      <div className="rw-segment-main">
        <MatchupForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMatchup
