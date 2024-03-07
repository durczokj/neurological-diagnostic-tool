import axios from 'axios'

const baseUrl = 'http://localhost:5001'

const postSymptoms = (symptoms) => {
    // const symptoms = api.get(baseUrl)
    // console.log(symptoms)
    // return symptoms
    const request = axios.post(`${baseUrl}/disease/from_symptoms`, symptoms)
    return request.then(response => response.data)
}

export default { postSymptoms }