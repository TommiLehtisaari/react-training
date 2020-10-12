import React, { FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'
import { styled } from '../utils/styled'

const FieldContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 16
})

const Label = styled.label((props) => ({
  color: props.theme.colors.text
}))

const ErrorMessage = styled.div({
  color: 'red'
})

interface IFormInputs {
  firstName: string
  lastName: string
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('Fist name is required')
    .min(2, 'First name has to be at least 2 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name has to be at least 2 characters')
})

interface Props {
  onAdd: (firstName: string, lastName: string) => void
}

export const AddPersonForm: FunctionComponent<Props> = ({ onAdd }) => {
  const { register, handleSubmit, errors, reset } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: IFormInputs) => {
    onAdd(data.firstName, data.lastName)
    reset()
  }

  return (
    <form style={{ width: 320, padding: 16, marginBottom: 32 }} onSubmit={handleSubmit(onSubmit)}>
      <FieldContainer>
        <Label htmlFor="firstName">First Name</Label>
        <input type="text" name="firstName" ref={register} />
        <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
      </FieldContainer>

      <FieldContainer>
        <Label htmlFor="lastName">Last Name</Label>
        <input type="text" name="lastName" ref={register} />
        <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
      </FieldContainer>

      <input type="submit" />
    </form>
  )
}
