import api from '@/shared/utils/api'
import axios from 'axios'

const symptomsBaseUrl = 'http://localhost:5001/symptoms'

const getSymptomsList = () => {
    const symptomsList = axios.get(symptomsBaseUrl).then(response => response.data)
    return symptomsList
}

const symptomBaseUrl = 'http://localhost:5001/symptom'

const createSymptom = (symptom) => {
    const createdSymptom = axios.post(symptomBaseUrl, symptom).then(response => response.data)
    return createdSymptom
}

const getSymptomByName = (symptom_name) => {
    const symptom = axios.get(`${symptomBaseUrl}/${symptom_name}`).then(response => response.data)
    return symptom
}

const deleteSymptom = (symptom_name) => {
    axios.delete(`${symptomBaseUrl}/${symptom_name}`)
}

const updateSymptom = (symptom) => {
    const updatedSymptom = axios.patch(`${symptomBaseUrl}/${symptom.name}`, symptom).then(response => response.data)
    return updatedSymptom
}

const getSymptomQuestion = (symptom_name) => {
    const question = axios.get(`${symptomBaseUrl}/${symptom_name}/question`).then(response => response.data)
    return question
}

const recommendNextSymptom = (symptom) => {
    const nextSymptom = axios.post(`${symptomBaseUrl}/recommend`, symptom).then(response => response.data)
    return nextSymptom
}

export default { getSymptomsList, createSymptom, getSymptomByName, deleteSymptom, updateSymptom, getSymptomQuestion, recommendNextSymptom }
