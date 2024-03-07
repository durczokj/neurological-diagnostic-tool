import api from '@/shared/utils/api'

const symptomsBaseUrl = '/symptoms'

export default const getSymptomsList = async () => {
    const symptoms = api.get(symptomsBaseUrl)
    return symptoms
}

const symptomBaseUrl = '/symptom'

export default const createSymptom = async symptom => {
    const symptom = api.post(symptomBaseUrl, symptom)
    return symptom
}

export default const getSymptomByName = async symptom_name => {
    const symptom = api.get(`${symptomBaseUrl}/${symptom_name}`)
    return symptom
}

export default const deleteSymptom = async symptom_name => {
    api.delete(`${symptomBaseUrl}/${symptom_name}`)
}

export default const updateSymptom = async symptom => {
    const updatedSymptom = api.patch(`${symptomBaseUrl}/${symptom.name}`, symptom)
    return updatedSymptom
}

export default const getSymptomQuestion = async symptom_name => {
    const question = api.get(`${symptomBaseUrl}/${symptom_name}/question`)
    return question
}

export default const recommendNextSymptom = async symptom => {
    const nextSymptom = api.post(`${symptomBaseUrl}/recommend`, symptom)
    return nextSymptom
}


