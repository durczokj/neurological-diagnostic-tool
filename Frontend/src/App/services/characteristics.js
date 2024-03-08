import api from '@/shared/utils/api'
import axios from 'axios'

const baseUrl = 'http://localhost:5001/characteristic'

const getCharacteristicsList = () => {
    const characteristics = axios.get(baseUrl).then(response => response.data)
    return characteristics
}

const createCharacteristic = (characteristic) => {
    const createdCharacteristic = axios.post(baseUrl, characteristic).then(response => response.data)
    return createdCharacteristic
}

const getCharacteristicById = (characteristic_id) => {
    const characteristic = axios.get(`${baseUrl}/${characteristic_id}`).then(response => response.data)
    return characteristic
}

const deleteCharacteristic = (characteristic_id) => {
    axios.delete(`${baseUrl}/${characteristic_id}`)
}

export default { getCharacteristicsList, createCharacteristic, getCharacteristicById, deleteCharacteristic }