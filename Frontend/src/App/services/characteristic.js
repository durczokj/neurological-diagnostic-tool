import api from '@/shared/utils/api'
import axios from 'axios'

const baseUrl = 'http://localhost:5001/characteristic'

const getCharacteristicList = () => {
    const characteristics = api.get(baseUrl).then(response => response.data)
    return characteristics
}

const createCharacteristic = (characteristic) => {
    const createdCharacteristic = api.post(baseUrl, characteristic).then(response => response.data)
    return createdCharacteristic
}

const getCharacteristicById = (characteristic_id) => {
    const characteristic = api.get(`${baseUrl}/${characteristic_id}`).then(response => response.data)
    return characteristic
}

const deleteCharacteristic = (characteristic_id) => {
    api.delete(`${baseUrl}/${characteristic_id}`)
}

export default { getCharacteristicList, createCharacteristic, getCharacteristicById, deleteCharacteristic }