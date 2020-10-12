import React, { useCallback, useEffect, useState } from 'react'
import { mq } from '../design'
import { v4 as uuidv4 } from 'uuid'

import { getPersons, Person as PersonResponse } from '../services/personService'
import { styled } from '../utils/styled'
import { AddPersonForm } from './AddPersonForm'
import { Person } from './Person'

const PersonGrid = styled.div(
  mq({
    display: 'grid',
    gridTemplateColumns: ['repeat(1, 1fr)', null, 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
    gridAutoRows: 'auto',
    gridGap: 16
  })
)

const Title = styled.h1((props) => ({
  textAlign: 'center',
  color: props.theme.colors.text
}))

export function App() {
  const [persons, setPersons] = useState<Array<PersonResponse>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getPersons()

      if (response.success) {
        setPersons(response.value.data.persons)
      } else {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleDelete = (uuid: string): void => {
    setPersons(persons.filter((person) => person.uuid !== uuid))
  }

  const addPerson = useCallback(
    (firstName: string, lastName: string) => {
      setPersons([
        {
          uuid: uuidv4(),
          firstName,
          lastName,
          age: 40,
          email: 'email@example.com',
          address: {
            streetAddress: 'Street',
            city: 'City'
          }
        },
        ...persons
      ])
    },
    [persons]
  )

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <header>
        <Title>Welcome to Fraktio's React training!</Title>
      </header>

      <AddPersonForm onAdd={addPerson} />

      {isLoading && <div>Loading...</div>}

      {isError && <div>Error</div>}

      {!isLoading && !isError && (
        <PersonGrid>
          {persons.map((person) => (
            <Person onDelete={handleDelete} key={person.uuid} person={person} />
          ))}
        </PersonGrid>
      )}
    </div>
  )
}
