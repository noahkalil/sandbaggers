import type { EditMatchupById, UpdateMatchupInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  DateField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormMatchup = NonNullable<EditMatchupById['matchup']>

interface MatchupFormProps {
  matchup?: EditMatchupById['matchup']
  onSave: (data: UpdateMatchupInput, id?: FormMatchup['id']) => void
  error: RWGqlError
  loading: boolean
}

const MatchupForm = (props: MatchupFormProps) => {
  const onSubmit = (data: FormMatchup) => {
    props.onSave(data, props?.matchup?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormMatchup> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="week"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Week
        </Label>

        <NumberField
          name="week"
          defaultValue={props.matchup?.week}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="week" className="rw-field-error" />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DateField
          name="date"
          defaultValue={formatDatetime(props.matchup?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="team1Id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Team1 id
        </Label>

        <NumberField
          name="team1Id"
          defaultValue={props.matchup?.team1Id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="team1Id" className="rw-field-error" />

        <Label
          name="team2Id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Team2 id
        </Label>

        <NumberField
          name="team2Id"
          defaultValue={props.matchup?.team2Id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="team2Id" className="rw-field-error" />

        <Label
          name="seasonId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Season id
        </Label>

        <NumberField
          name="seasonId"
          defaultValue={props.matchup?.seasonId}
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

export default MatchupForm
