import api from '@/shared/utils/api'

const baseUrl = '/symptoms'

export default const getSymptoms = async () => {
    const response = api.get(baseUrl)
    return response
}

export default const postSymptoms = async (symptoms) => {
    const response = api.post(baseUrl, symptoms)
    return response
}