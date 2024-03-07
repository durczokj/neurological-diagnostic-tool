import api from '@/shared/utils/api'

const baseUrl = '/disease'

export default const getDiseaseList = async () => {
    const diseases = api.get(baseUrl)
    return diseases
}

export default const createDisease = async disease => {
    const disease = api.post(baseUrl, disease)
    return disease
}

export default const getDiseaseByName = async disease_name => {
    const disease = api.get(`${baseUrl}/${disease_name}`)
    return disease
}

export default const deleteDisease = async disease_name => {
    api.delete(`${baseUrl}/${disease_name}`)
}

export default const updateDisease = async disease => {
    const updatedDisease = api.patch(`${baseUrl}/${disease.name}`, disease)
    return updatedDisease
}
