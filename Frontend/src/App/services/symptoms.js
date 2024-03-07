import axios from 'axios'
import api from '@/shared/utils/api'

const baseUrl = 'http://localhost:5001/symptoms'

const postSymptomsList = async symptomList => {
    const symptom = api.post(baseUrl, symptomList)

    return symptom
}

const getSymptomsList = () => {
  // const symptoms = api.get(baseUrl)
  // console.log(symptoms)
  // return symptoms
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { postSymptomsList, getSymptomsList }