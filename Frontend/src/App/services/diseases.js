//services/diseases.js
import axios from 'axios'

const baseUrl = 'http://localhost:5001'

const postSymptoms = (symptoms) => {
    // const symptoms = api.get(baseUrl)
    // console.log(symptoms)
    // return symptoms
    const request = axios.post(`${baseUrl}/disease/from_symptoms`, symptoms)
    return request.then(response => response.data)
}

const postSymptomsPatient = (symptoms) => {
    // const symptoms = api.get(baseUrl)
    // console.log(symptoms)
    // return symptoms
    const request = axios.post(`${baseUrl}/disease/final_results_group`, symptoms)
    return request.then(response => response.data)
}

const postSymptomsDoctor = (symptoms) => {
    // const symptoms = api.get(baseUrl)
    // console.log(symptoms)
    // return symptoms
    const request = axios.post(`${baseUrl}/disease/final_results_disease`, symptoms)
    return request.then(response => response.data)
}

export default { postSymptoms, postSymptomsDoctor, postSymptomsPatient}