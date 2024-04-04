import type {
  EditTeamById,
  UpdateTeamInput,
  UpdateTeamMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TeamForm from 'src/components/Team/TeamForm'

export const QUERY: TypedDocumentNode<EditTeamById> = gql`
  query EditTeamById($id: Int!) {
    team: team(id: $id) {
      id
      name
      seasonId
    }
  }
`

const UPDATE_TEAM_MUTATION: TypedDocumentNode<
  EditTeamById,
  UpdateTeamMutationVariables
> = gql`
  mutation UpdateTeamMutation($id: Int!, $input: UpdateTeamInput!) {
    updateTeam(id: $id, input: $input) {
      id
      name
      seasonId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ team }: CellSuccessProps<EditTeamById>) => {
  const [updateTeam, { loading, error }] = useMutation(UPDATE_TEAM_MUTATION, {
    onCompleted: () => {
      toast.success('Team updated')
      navigate(routes.teams())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateTeamInput, id: EditTeamById['team']['id']) => {
    updateTeam({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Team {team?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TeamForm team={team} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
