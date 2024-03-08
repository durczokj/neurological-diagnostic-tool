import api from '@/shared/utils/api'
import axios from 'axios'

const baseUrl = 'http://localhost:5001/disease'

const getDiseaseList = () => {
    const diseases = api.get(baseUrl).then(response => response.data)
    return diseases
}

const createDisease = (disease) => {
    const createdDisease = api.post(baseUrl, disease).then(response => response.data)
    return createdDisease
}

const getDiseaseByName = (disease_name) => {
    const disease = api.get(`${baseUrl}/${disease_name}`).then(response => response.data)
    return disease
}

const deleteDisease = (disease_name) => {
    api.delete(`${baseUrl}/${disease_name}`)
}

const updateDisease = (disease) => {
    const updatedDisease = api.patch(`${baseUrl}/${disease.name}`, disease).then(response => response.data)
    return updatedDisease
}

export default { getDiseaseList, createDisease, getDiseaseByName, deleteDisease, updateDisease }