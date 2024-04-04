import type { EditTeamById, UpdateTeamInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormTeam = NonNullable<EditTeamById['team']>

interface TeamFormProps {
  team?: EditTeamById['team']
  onSave: (data: UpdateTeamInput, id?: FormTeam['id']) => void
  error: RWGqlError
  loading: boolean
}

const TeamForm = (props: TeamFormProps) => {
  const onSubmit = (data: FormTeam) => {
    props.onSave(data, props?.team?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTeam> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.team?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="seasonId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Season id
        </Label>

        <NumberField
          name="seasonId"
          defaultValue={props.team?.seasonId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="seasonId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TeamForm
