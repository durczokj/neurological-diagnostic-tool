import api from '@/shared/utils/api'

const baseUrl = '/disease'

export const getDiseaseList = async () => {
    const diseases = api.get(baseUrl)
    return diseases
}

export const createDisease = async (disease) => {
    const createdDisease = api.post(baseUrl, disease)
    return createdDisease
}

export const getDiseaseByName = async (disease_name) => {
    const disease = api.get(`${baseUrl}/${disease_name}`)
    return disease
}

export const deleteDisease = async (disease_name) => {
    api.delete(`${baseUrl}/${disease_name}`)
}

export const updateDisease = async (disease) => {
    const updatedDisease = api.patch(`${baseUrl}/${disease.name}`, disease)
    return updatedDisease
}
