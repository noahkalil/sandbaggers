import type {
  CreateSeasonMutation,
  CreateSeasonInput,
  CreateSeasonMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SeasonForm from 'src/components/Season/SeasonForm'

const CREATE_SEASON_MUTATION: TypedDocumentNode<
  CreateSeasonMutation,
  CreateSeasonMutationVariables
> = gql`
  mutation CreateSeasonMutation($input: CreateSeasonInput!) {
    createSeason(input: $input) {
      id
    }
  }
`

const NewSeason = () => {
  const [createSeason, { loading, error }] = useMutation(
    CREATE_SEASON_MUTATION,
    {
      onCompleted: () => {
        toast.success('Season created')
        navigate(routes.seasons())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateSeasonInput) => {
    createSeason({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Season</h2>
      </header>
      <div className="rw-segment-main">
        <SeasonForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSeason
