import api from '@/shared/utils/api'

const baseUrl = '/symptoms'

const postSymptomsList = async symptomList => {
    const symptom = api.post(baseUrl, symptomList)

    return symptom
}

const getSymptomsList = async () => {
  const symptoms = api.get(baseUrl)

  return symptoms
}

export default { postSymptomsList, getSymptomsList }