import api from '@/shared/utils/api'

const symptomsBaseUrl = '/symptoms'

export const getSymptomsList = async () => {
    const symptoms = api.get(symptomsBaseUrl)
    return symptoms
}

const symptomBaseUrl = '/symptom'

export const createSymptom = async (symptom) => {
    const createdSymptom = api.post(symptomBaseUrl, symptom)
    return createdSymptom
}

export const getSymptomByName = async (symptom_name) => {
    const symptom = api.get(`${symptomBaseUrl}/${symptom_name}`)
    return symptom
}

export const deleteSymptom = async (symptom_name) => {
    api.delete(`${symptomBaseUrl}/${symptom_name}`)
}

export const updateSymptom = async (symptom) => {
    const updatedSymptom = api.patch(`${symptomBaseUrl}/${symptom.name}`, symptom)
    return updatedSymptom
}

export const getSymptomQuestion = async (symptom_name) => {
    const question = api.get(`${symptomBaseUrl}/${symptom_name}/question`)
    return question
}

export const recommendNextSymptom = async (symptom) => {
    const nextSymptom = api.post(`${symptomBaseUrl}/recommend`, symptom)
    return nextSymptom
}


