import type { EditMatchResultById, UpdateMatchResultInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormMatchResult = NonNullable<EditMatchResultById['matchResult']>

interface MatchResultFormProps {
  matchResult?: EditMatchResultById['matchResult']
  onSave: (data: UpdateMatchResultInput, id?: FormMatchResult['id']) => void
  error: RWGqlError
  loading: boolean
}

const MatchResultForm = (props: MatchResultFormProps) => {
  const onSubmit = (data: FormMatchResult) => {
    props.onSave(data, props?.matchResult?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormMatchResult> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="matchupId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Matchup id
        </Label>

        <NumberField
          name="matchupId"
          defaultValue={props.matchResult?.matchupId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="matchupId" className="rw-field-error" />

        <Label
          name="player1Id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Player1 id
        </Label>

        <NumberField
          name="player1Id"
          defaultValue={props.matchResult?.player1Id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="player1Id" className="rw-field-error" />

        <Label
          name="player2Id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Player2 id
        </Label>

        <NumberField
          name="player2Id"
          defaultValue={props.matchResult?.player2Id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="player2Id" className="rw-field-error" />

        <Label
          name="player1Score"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Player1 score
        </Label>

        <NumberField
          name="player1Score"
          defaultValue={props.matchResult?.player1Score}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="player1Score" className="rw-field-error" />

        <Label
          name="player2Score"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Player2 score
        </Label>

        <NumberField
          name="player2Score"
          defaultValue={props.matchResult?.player2Score}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="player2Score" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MatchResultForm
