import type { EditSeasonById, UpdateSeasonInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormSeason = NonNullable<EditSeasonById['season']>

interface SeasonFormProps {
  season?: EditSeasonById['season']
  onSave: (data: UpdateSeasonInput, id?: FormSeason['id']) => void
  error: RWGqlError
  loading: boolean
}

const SeasonForm = (props: SeasonFormProps) => {
  const onSubmit = (data: FormSeason) => {
    props.onSave(data, props?.season?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormSeason> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="year"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Year
        </Label>

        <NumberField
          name="year"
          defaultValue={props.season?.year}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="year" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default SeasonForm
