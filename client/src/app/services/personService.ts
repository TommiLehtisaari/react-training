import axios from 'axios'

import { config } from '../../config'
import { failure, success, Try } from '../utils/types'

export interface PersonResponse {
  data: {
    persons: Array<Person>
  }
  meta: {
    personCount: number
  }
}

export interface Person {
  uuid: string
  firstName: string
  lastName: string
  email: string | null
  age: number
  address: null | {
    streetAddress: string
    city: string
  }
}

export const getPersons = async (): Promise<Try<PersonResponse>> => {
  try {
    const response = await axios.get(`${config.API_URL}/persons`)

    return success(response.data)
  } catch (e) {
    return failure(e)
  }
}
