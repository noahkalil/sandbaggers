import type {
  CreateTeamMutation,
  CreateTeamInput,
  CreateTeamMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TeamForm from 'src/components/Team/TeamForm'

const CREATE_TEAM_MUTATION: TypedDocumentNode<
  CreateTeamMutation,
  CreateTeamMutationVariables
> = gql`
  mutation CreateTeamMutation($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
    }
  }
`

const NewTeam = () => {
  const [createTeam, { loading, error }] = useMutation(CREATE_TEAM_MUTATION, {
    onCompleted: () => {
      toast.success('Team created')
      navigate(routes.teams())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateTeamInput) => {
    createTeam({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Team</h2>
      </header>
      <div className="rw-segment-main">
        <TeamForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTeam
