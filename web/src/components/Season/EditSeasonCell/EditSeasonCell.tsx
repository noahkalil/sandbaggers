import type {
  EditSeasonById,
  UpdateSeasonInput,
  UpdateSeasonMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SeasonForm from 'src/components/Season/SeasonForm'

export const QUERY: TypedDocumentNode<EditSeasonById> = gql`
  query EditSeasonById($id: Int!) {
    season: season(id: $id) {
      id
      year
    }
  }
`

const UPDATE_SEASON_MUTATION: TypedDocumentNode<
  EditSeasonById,
  UpdateSeasonMutationVariables
> = gql`
  mutation UpdateSeasonMutation($id: Int!, $input: UpdateSeasonInput!) {
    updateSeason(id: $id, input: $input) {
      id
      year
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ season }: CellSuccessProps<EditSeasonById>) => {
  const [updateSeason, { loading, error }] = useMutation(
    UPDATE_SEASON_MUTATION,
    {
      onCompleted: () => {
        toast.success('Season updated')
        navigate(routes.seasons())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateSeasonInput,
    id: EditSeasonById['season']['id']
  ) => {
    updateSeason({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Season {season?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SeasonForm
          season={season}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
