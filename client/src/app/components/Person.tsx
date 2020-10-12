import React, { FunctionComponent } from 'react'
import { styled } from '../utils/styled'

import { ReactComponent as ReactLogo } from '../assets/man.svg'

const PersonListItem = styled.div((props) => ({
  maxWidth: 380,
  boxShadow: `2px 3px 15px ${props.theme.colors.shadow}`,
  overflow: 'hidden',
  borderRadius: 5,
  backgroundColor: props.theme.colors.secondary,
  position: 'relative'
}))

const PersonName = styled.div((props) => ({
  fontSize: 22,
  fontWeight: 'bold',
  paddingBottom: 16,
  color: props.theme.colors.text
}))

const StyledDiv = styled.div((props) => ({
  svg: {
    fill: props.theme.colors.textSecondary,
    height: 380,
    padding: 4
  }
}))

const ContactHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between'
})

const ContactInfo = styled.div((props) => ({
  padding: 16,
  backgroundColor: props.theme.colors.secondary
}))

const SecondaryText = styled.div((props) => ({
  color: props.theme.colors.textSecondary
}))

type Address = {
  streetAddress: string
  city: string
}

type Person = {
  uuid: string
  firstName: string
  lastName: string
  email: string | null
  age: number
  address: Address | null
}

interface Props {
  person: Person
  onDelete: (uuid: string) => void
}

export const Person: FunctionComponent<Props> = ({ person, onDelete }) => (
  <PersonListItem>
    {/* <ProfileImage src={placeholderImage} alt="profileimage" /> */}
    <StyledDiv>
      <ReactLogo />
    </StyledDiv>
    <ContactInfo>
      <ContactHeader>
        <PersonName>
          {person.firstName} {person.lastName}
        </PersonName>
        <SecondaryText>Age {Math.floor(person.age)}</SecondaryText>
      </ContactHeader>
      {person.address && (
        <SecondaryText style={{ marginBottom: 4 }}>
          {person.address?.streetAddress}, {person.address?.city}
        </SecondaryText>
      )}
      <SecondaryText>{person.email}</SecondaryText>
    </ContactInfo>

    <button
      onClick={() => onDelete(person.uuid)}
      style={{ position: 'absolute', right: 16, bottom: 16 }}
    >
      Delete
    </button>
  </PersonListItem>
)
